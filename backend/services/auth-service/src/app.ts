import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport';
import { readFileSync } from 'fs';
import { join } from 'path';
// Security handled via shared helper
import { applyStandardSecurity, buildHealthPayload as sharedBuildHealthPayload, createReadinessRegistry, runReadiness, startTracing } from './shared';

// Helper to get version from package.json
function getServiceVersion(): string {
    try {
        const pkgPath = join(__dirname, '..', 'package.json');
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        return pkg.version || '1.0.0';
    } catch {
        return '1.0.0';
    }
}
// Health payload helper: prefer shared implementation via stable relative path (runtime-safe) with fallback.
let buildHealthPayload: any;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ({ buildHealthPayload } = { buildHealthPayload: sharedBuildHealthPayload });
} catch {
    buildHealthPayload = (service: string, version?: string, domain?: any) => ({
        status: 'ok',
        service,
        version: version || (process as any).env.npm_package_version || 'unknown',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    });
}
import { buildContainer } from './hexagon';
import { requestContextMiddleware } from './shared';
import { createAuthRoutes } from './http/routes';
import { createOAuthRoutes } from './http/oauthRoutes'; interface LoggerLike { info: (...a: any[]) => void; warn: (...a: any[]) => void; error: (...a: any[]) => void }

let sharedMetrics: any = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sharedMetrics = require('../../shared');
} catch { }

let sharedLoggerFactory: any = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sharedLoggerFactory = require('../../shared').createLogger;
} catch { }

export interface BuildAppOptions {
    logger?: LoggerLike;
    disableMetrics?: boolean;
    metricsPath?: string;
    serviceName?: string;
}

export function buildApp(opts: BuildAppOptions = {}): express.Express {
    const serviceName = opts.serviceName || 'auth-service';
    const logger: LoggerLike = opts.logger || (sharedLoggerFactory ? sharedLoggerFactory(serviceName) : console);
    const metricsPath = opts.metricsPath || '/metrics';

    const app = express();
    app.locals.serviceName = serviceName;
    app.locals.logger = logger;
    // Initialize tracing lazily (no-op if env not set)
    startTracing({ serviceName }).catch(err => logger.warn(`[tracing] init failed: ${err?.message}`));
    // CORS configuration - allow requests from frontend
    app.use(cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'https://comeondost.netlify.app',
            ...(process.env.ALLOWED_ORIGINS?.split(',').filter(o => o) || [])
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Cast due to potential duplicate @types/express versions across service and shared packages
    app.use(requestContextMiddleware as any);
    app.use(express.json());
    // Apply shared security defaults (helmet + rate limiter) enabling trust proxy for rate limiting when behind proxy
    applyStandardSecurity(app, { rateLimit: true, trustProxy: true });

    // Metrics setup shared or fallback
    if (!opts.disableMetrics) {
        if (sharedMetrics) {
            try {
                const bundle = sharedMetrics.createHttpMetrics(serviceName);
                app.locals.metrics = bundle;
                app.use(sharedMetrics.metricsMiddleware(bundle));
                sharedMetrics.exposeMetricsEndpoint(app, bundle, metricsPath);
                logger.info(`[metrics] Using shared metrics for ${serviceName}`);
            } catch (e) {
                logger.warn(`[metrics] Failed shared metrics init: ${(e as any)?.message}`);
            }
        }
        if (!app.locals.metrics) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const client = require('prom-client');
                const registry = new client.Registry();
                client.collectDefaultMetrics({ register: registry, labels: { service: serviceName } });
                const httpRequestsTotal = new client.Counter({ name: 'http_requests_total', help: 'Total HTTP requests', labelNames: ['method', 'route', 'status_code', 'service'] });
                const httpRequestDurationMs = new client.Histogram({ name: 'http_request_duration_ms', help: 'HTTP request duration ms', labelNames: ['method', 'route', 'status_code', 'service'], buckets: [5, 10, 25, 50, 100, 250, 500, 1000] });
                registry.registerMetric(httpRequestsTotal);
                registry.registerMetric(httpRequestDurationMs);
                app.locals.metrics = { registry, httpRequestsTotal, httpRequestDurationMs };
                app.use((req, res, next) => {
                    const start = Date.now();
                    res.on('finish', () => {
                        const route = (req as any).route?.path || req.path || 'unknown';
                        const labels = { method: req.method, route, status_code: String(res.statusCode), service: serviceName };
                        httpRequestsTotal.inc(labels);
                        httpRequestDurationMs.observe(labels, Date.now() - start);
                    });
                    next();
                });
                app.get(metricsPath, async (_req, res) => {
                    res.set('Content-Type', registry.contentType);
                    res.send(await registry.metrics());
                });
                logger.warn(`[metrics] Shared metrics unavailable. Fallback registry active for ${serviceName}`);
            } catch (e) {
                logger.error(`[metrics] Failed fallback metrics init: ${(e as any)?.message}`);
            }
        }
    } else {
        logger.warn('[metrics] Metrics disabled via options');
    }

    // Session configuration for OAuth
    app.use(session({
        secret: process.env.SESSION_SECRET || 'your-session-secret-change-in-production',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }));

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Container & routes
    const container = buildContainer();
    app.use('/api/auth', createAuthRoutes(container));
    app.use('/api/auth', createOAuthRoutes());

    // Readiness registry (extend with DB / cache when available)
    const readiness = createReadinessRegistry();
    // Example placeholder check (always ok) so shape remains consistent
    readiness.register('startupWarmup', async () => ({ name: 'startupWarmup', status: process.uptime() > 5 ? 'ok' : 'degraded' }));

    // Health simple endpoint (reflect metrics & version placeholders later if needed)
    app.get('/health', (_req, res) => {
        res.json(buildHealthPayload(serviceName, getServiceVersion()));
    });

    // Root route for basic service verification
    app.get('/', (_req, res) => {
        res.json({
            service: serviceName,
            status: 'running',
            version: getServiceVersion(),
            timestamp: new Date().toISOString()
        });
    });

    // Readiness endpoint
    app.get('/ready', async (_req, res) => {
        const agg = await runReadiness(readiness, serviceName);
        const code = agg.overall === 'ok' ? 200 : agg.overall === 'degraded' ? 200 : 503;
        res.status(code).json(agg);
    });

    // 404 handler
    app.use((req, res) => {
        logger.warn(`404 ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: 'Not Found' });
    });

    // Error handler
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        logger.error('Unhandled error', err);
        res.status(500).json({ success: false, message: err?.message || 'Internal error' });
    });

    return app;
}

export default buildApp;
