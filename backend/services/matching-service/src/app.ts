import express from 'express';
import cors from 'cors';
import { applyStandardSecurity } from './shared';
import morgan from 'morgan';
import matchingRoutes from './routes/matchingRoutes';
import adminRoutes from './routes/adminRoutes';
import { logger } from './utils/logger';

// Attempt shared metrics; fallback to local lightweight registry
let sharedFactory: any = null;
let exposeMetricsEndpoint: any = null;
let sharedMiddleware: any = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const m = require('./shared');
    sharedFactory = m.createHttpMetrics;
    exposeMetricsEndpoint = m.exposeMetricsEndpoint;
    sharedMiddleware = m.metricsMiddleware;
} catch (e) {
    logger.warn(`Shared metrics module unavailable: ${(e as any)?.message || e}`);
}

export function buildApp(): express.Express {
    const app = express();

    // More permissive rate limiting for development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const rateLimitConfig = isDevelopment
        ? { windowMs: 1 * 60 * 1000, limit: 1000 } // 1000 requests per minute in dev
        : { windowMs: 15 * 60 * 1000, limit: 100 }; // 100 requests per 15 minutes in prod

    applyStandardSecurity(app, { rateLimit: rateLimitConfig, trustProxy: true });
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://karnisinghji.github.io',
            'https://comeondost.netlify.app'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        optionsSuccessStatus: 200
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('combined', { stream: { write: (msg: string) => logger.info(msg.trim()) } }));

    // Metrics
    let metricsBundle: any = null;
    if (sharedFactory) {
        metricsBundle = sharedFactory('matching-service');
        if (sharedMiddleware) app.use(sharedMiddleware(metricsBundle));
        if (exposeMetricsEndpoint) exposeMetricsEndpoint(app, metricsBundle, '/metrics');
    } else {
        // Local fallback
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const client = require('prom-client');
        const registry = new client.Registry();
        client.collectDefaultMetrics({ register: registry, labels: { service: 'matching-service' } });
        const httpRequestsTotal = new client.Counter({
            name: 'http_requests_total', help: 'Total HTTP requests', labelNames: ['method', 'route', 'status_code', 'service']
        });
        const httpRequestDurationMs = new client.Histogram({
            name: 'http_request_duration_ms', help: 'Duration of HTTP requests in ms', labelNames: ['method', 'route', 'status_code', 'service'], buckets: [5, 10, 25, 50, 100, 250, 500, 1000]
        });
        registry.registerMetric(httpRequestsTotal);
        registry.registerMetric(httpRequestDurationMs);
        metricsBundle = { registry, httpRequestsTotal, httpRequestDurationMs };
        app.use((req, res, next) => {
            const start = Date.now();
            res.on('finish', () => {
                const route = (req as any).route?.path || req.path || 'unknown';
                const labels = { method: req.method, route, status_code: String(res.statusCode), service: 'matching-service' };
                httpRequestsTotal.inc(labels);
                httpRequestDurationMs.observe(labels, Date.now() - start);
            });
            next();
        });
        app.get('/metrics', async (_req, res) => {
            res.set('Content-Type', registry.contentType);
            res.send(await registry.metrics());
        });
    }

    // Routes
    app.use('/', matchingRoutes);
    app.use('/', adminRoutes);

    app.get('/ready', (_req, res) => {
        const missing = ['NODE_ENV'].filter(v => !process.env[v]);
        const warm = process.uptime() >= 5;
        const status = missing.length === 0 && warm ? 'ready' : 'not-ready';
        res.status(status === 'ready' ? 200 : 503).json({
            status,
            missingEnv: missing,
            uptimeSeconds: Math.round(process.uptime())
        });
    });

    // 404
    app.use((req, res) => {
        logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });

    // Error handler (generic; domain specific errors can be added later)
    app.use((error: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
        logger.error('Unhandled error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    });

    return app;
}

export default buildApp;
