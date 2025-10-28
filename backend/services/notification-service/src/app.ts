import express from 'express';
import cors from 'cors';
import { applyStandardSecurity, validate } from './shared';
import { z } from 'zod';
import morgan from 'morgan';
import { readFileSync } from 'fs';
import { join } from 'path';
import { buildNotificationModule } from './hexagon';

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

let buildHealthPayload: any;
try {
    ({ buildHealthPayload } = require('./shared/health'));
} catch {
    buildHealthPayload = (service: string, version?: string, domain?: any) => ({
        status: 'ok',
        service,
        version: version || getServiceVersion(),
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    });
}

// Lightweight internal logger abstraction (can be replaced later with shared logger)
interface LoggerLike {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}

export interface BuildAppOptions {
    version?: string;                // Service version string for /health and domain wiring
    serviceName?: string;            // Override metrics service label (default: notification-service)
    metricsPath?: string;            // Path to expose /metrics (default: /metrics)
    disableMetrics?: boolean;        // Disable metrics entirely (tests / special cases)
    logger?: LoggerLike;             // Inject custom logger
}

let shared: any = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    shared = require('./shared');
} catch {
    // silent; fallback handled below
}

/**
 * Build the Notification Service Express app.
 * Supports two invocation forms for backward compatibility:
 *  - buildApp('1.0.0')
 *  - buildApp({ version: '1.0.0', serviceName: 'notification-service' })
 */
export function buildApp(versionOrOptions?: string | BuildAppOptions): express.Express {
    let options: BuildAppOptions;
    if (typeof versionOrOptions === 'string' || versionOrOptions === undefined) {
        options = { version: versionOrOptions, serviceName: 'notification-service' };
    } else {
        options = { serviceName: 'notification-service', metricsPath: '/metrics', ...versionOrOptions };
    }

    const serviceName = options.serviceName || 'notification-service';
    const metricsPath = options.metricsPath || '/metrics';
    const version = options.version || '0.0.0';
    const logger: LoggerLike = options.logger || console;

    const app = express();
    const hex = buildNotificationModule(version);

    app.locals.serviceName = serviceName;
    app.locals.version = version;

    applyStandardSecurity(app, { rateLimit: true, trustProxy: true });

    // CORS debugging logs
    console.log('----------------------------------------');
    console.log('CORS CONFIGURATION DEBUGGING');
    console.log('----------------------------------------');
    console.log('Environment variables:');
    console.log('- ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS);
    console.log('- CORS_ORIGINS:', process.env.CORS_ORIGINS);
    console.log('- CORS_ORIGIN:', process.env.CORS_ORIGIN);

    const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').filter(o => o.trim()) || [
        'https://karnisinghji.github.io',
        'https://comeondost.web.app',
        'https://comeondost.firebaseapp.com',
        'https://comeondost.netlify.app',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://localhost',  // Capacitor mobile app
        'capacitor://localhost'  // Alternative Capacitor scheme
    ];
    console.log('Configured allowed origins:');
    console.log(allowedOrigins);
    console.log('----------------------------------------');

    app.use(cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));
    app.use(express.json());
    app.use(morgan('dev'));

    if (!options.disableMetrics) {
        if (shared) {
            try {
                const bundle = shared.createHttpMetrics(serviceName);
                app.locals.metrics = bundle; // expose for tests / introspection
                app.use(shared.metricsMiddleware(bundle));
                shared.exposeMetricsEndpoint(app, bundle, metricsPath);
                logger.info(`[metrics] Using shared metrics module for ${serviceName} at ${metricsPath}`);
            } catch (e) {
                logger.warn(`[metrics] Shared metrics initialization failed: ${(e as any)?.message}`);
            }
        }
        if (!app.locals.metrics) {
            // Fallback to local prom-client registry
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
                logger.warn(`[metrics] Shared metrics unavailable. Using fallback registry for ${serviceName} at ${metricsPath}`);
            } catch (e) {
                logger.error(`[metrics] Failed to init fallback metrics: ${(e as any)?.message}`);
            }
        }
    } else {
        logger.warn('[metrics] Metrics disabled via options');
    }

    const startedAt = Date.now();
    app.get('/health', (_req, res) => {
        const domain = hex.useCases.getHealth.execute();
        res.json(buildHealthPayload(serviceName, version, domain));
    });

    app.get('/ready', (_req, res) => {
        const requiredEnv = ['NODE_ENV'];
        const missing = requiredEnv.filter(v => !process.env[v]);
        const warmup = process.uptime() < 5;
        const notReady = warmup || missing.length > 0;
        res.status(notReady ? 503 : 200).json({
            status: notReady ? 'not-ready' : 'ready',
            missingEnv: missing,
            uptimeSeconds: Math.round(process.uptime())
        });
    });

    const sendNotificationSchema = z.object({
        userId: z.string().min(1),
        channel: z.string().min(1),
        template: z.string().min(1),
        data: z.record(z.any()).optional()
    });
    app.post('/notifications', validate({ schema: sendNotificationSchema }), async (req, res) => {
        try {
            const result = await hex.useCases.sendNotification.execute({ ...req.body, data: req.body.data || {} });
            res.status(result.status === 'failed' ? 422 : 201).json({ success: result.status === 'sent', data: result });
        } catch (e: any) {
            res.status(500).json({ success: false, message: e.message || 'Failed to send notification' });
        }
    });

    // WebSocket route placeholder - returns upgrade required
    app.get('/ws', (req, res) => {
        logger.info(`WebSocket connection attempt from ${req.ip} - returning upgrade required`);
        res.status(426).json({
            success: false,
            message: 'Upgrade Required',
            upgrade: 'WebSocket',
            note: 'WebSocket server not yet implemented'
        });
    });

    // 404
    app.use((req, res) => {
        logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });

    // Error handler
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        logger.error('Unhandled error in notification-service', err);
        res.status(500).json({ success: false, message: err?.message || 'Internal server error' });
    });

    return app;
}

export default buildApp;
