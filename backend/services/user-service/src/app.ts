import express from 'express';
import cors from 'cors';
import { applyStandardSecurity, createReadinessRegistry, runReadiness, startTracing } from '../../shared';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import invitationRoutes from './routes/invitationRoutes';
import { logger } from './utils/logger';
import { DomainError } from './hexagon/domain/errors/DomainErrors';
import { userMetricsBundle } from './observability/metrics';

// Shared metrics placeholders (resolved at build time)
let exposeMetricsEndpoint: any = null;
let sharedMetricsMiddlewareFactory: any = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const shared = require('../../shared');
    exposeMetricsEndpoint = shared.exposeMetricsEndpoint;
    sharedMetricsMiddlewareFactory = shared.metricsMiddleware;
} catch (e) {
    logger.warn('Shared metrics module unavailable, HTTP level metrics disabled');
}

/**
 * buildApp
 * Central factory that constructs and configures the Express application for the user-service.
 * This isolates infrastructure wiring from process bootstrap (env loading, listening) enabling:
 *  - Reuse in tests without side effects (no implicit server listen)
 *  - Future dependency injection (pass fakes/mocks) by extending options signature
 *  - Consistent instrumentation & error-handling assembly.
 */
export function buildApp(): express.Express {
    const app = express();
    const serviceName = 'user-service';
    startTracing({ serviceName }).catch(err => logger.warn(`[tracing] init failed: ${err?.message}`));

    // Security middleware (shared) + custom headers
    applyStandardSecurity(app, { rateLimit: true, trustProxy: true });
    // Custom security headers (retained)
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Referrer-Policy', 'no-referrer');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Permissions-Policy', 'geolocation=()');
        res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
        if (process.env.ENABLE_HSTS === 'true') {
            res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
        }
        next();
    });
    app.use(cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'https://karnisinghji.github.io',
            ...(process.env.ALLOWED_ORIGINS?.split(',').filter(o => o) || [])
        ],
        credentials: true
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // Redaction helper
    function redact(line: string) {
        return line
            .replace(/(authorization|auth|token)=([^\s]+)/gi, '$1=[REDACTED]')
            .replace(/("password"\s*:\s*")[^"]+"/gi, '"password":"[REDACTED]"');
    }
    app.use(morgan('combined', {
        stream: { write: (message: string) => logger.info(redact(message.trim())) }
    }));

    // Metrics & HTTP instrumentation
    if (sharedMetricsMiddlewareFactory) {
        app.use(sharedMetricsMiddlewareFactory(userMetricsBundle));
    } else {
        app.use((req, res, next) => {
            const start = Date.now();
            res.on('finish', () => {
                const route = (req as any).route?.path || req.path || 'unknown';
                const labels = { method: req.method, route, status_code: String(res.statusCode), service: 'user-service' } as any;
                const anyBundle: any = userMetricsBundle as any;
                if (anyBundle.httpRequestsTotal) anyBundle.httpRequestsTotal.inc(labels);
                if (anyBundle.httpRequestDurationMs) anyBundle.httpRequestDurationMs.observe(labels, Date.now() - start);
            });
            next();
        });
    }
    if (exposeMetricsEndpoint) {
        exposeMetricsEndpoint(app, userMetricsBundle, '/metrics');
    } else {
        app.get('/metrics', async (_req, res) => {
            res.set('Content-Type', userMetricsBundle.registry.contentType);
            res.send(await userMetricsBundle.registry.metrics());
        });
    }

    // Readiness endpoint (extend with DB connectivity check when available)
    const readiness = createReadinessRegistry();
    readiness.register('env', async () => ({ name: 'env', status: ['JWT_SECRET'].every(v => !!process.env[v]) ? 'ok' : 'failed' }));
    readiness.register('warmup', () => ({ name: 'warmup', status: process.uptime() > 5 ? 'ok' : 'degraded' }));
    app.get('/ready', async (_req, res) => {
        const agg = await runReadiness(readiness, serviceName);
        const code = agg.overall === 'failed' ? 503 : 200;
        res.status(code).json(agg);
    });

    // Routes
    app.use('/', userRoutes);
    app.use('/', invitationRoutes);

    // 404 handler
    app.use((req, res) => {
        logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });

    // Global error handler
    app.use((error: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
        if (error instanceof DomainError) {
            logger.warn(`Domain error ${error.code}: ${error.message}`);
            res.status(error.status).json({ success: false, code: error.code, message: error.message, details: error.details });
            return;
        }
        logger.error('Unhandled error:', error);
        res.status(500).json({ success: false, code: 'INTERNAL_ERROR', message: 'Internal server error' });
    });

    return app;
}

export default buildApp;
