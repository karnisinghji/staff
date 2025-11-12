import express from 'express';
import cors from 'cors';
import { applyStandardSecurity } from './shared';
import morgan from 'morgan';
import matchingRoutes from './routes/matchingRoutes';
import adminRoutes from './routes/adminRoutes';
import { logger } from './utils/logger';

// Attempt shared metrics; fallback to local lightweight registry
// CORS fix: Ensuring mobile app origins are properly handled
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

    // CORS must be applied BEFORE security middleware for preflight requests
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').map(o => o.trim()).filter(o => o) || [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://localhost',  // Capacitor mobile app
        'capacitor://localhost',  // Alternative Capacitor scheme
        'https://comeondost.web.app',
        'https://comeondost.firebaseapp.com'
    ];

    // Debug logging for CORS configuration
    console.log('========================================');
    console.log('MATCHING-SERVICE CORS CONFIGURATION');
    console.log('========================================');
    console.log('ALLOWED_ORIGINS env var:', process.env.ALLOWED_ORIGINS);
    console.log('Parsed allowed origins array:', JSON.stringify(allowedOrigins, null, 2));
    console.log('Array includes "https://localhost"?:', allowedOrigins.includes('https://localhost'));
    console.log('========================================');

    // Manual CORS handler to debug issues
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        console.log(`[CORS MANUAL] Request: ${req.method} ${req.path}, Origin: ${origin}`);

        // Check if origin is allowed (exact match or localhost/capacitor variations)
        const isAllowed = origin && (
            allowedOrigins.includes(origin) ||
            origin.includes('localhost') ||
            origin.includes('capacitor') ||
            origin === 'https://localhost' ||
            origin === 'capacitor://localhost' ||
            origin.startsWith('file://')
        );

        if (isAllowed) {
            console.log(`[CORS MANUAL] ✓ Origin allowed, setting headers`);
            res.setHeader('Access-Control-Allow-Origin', origin || '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
            if (req.method === 'OPTIONS') {
                console.log(`[CORS MANUAL] OPTIONS preflight, sending 200`);
                res.status(200).end();
                return;
            }
        } else {
            console.log(`[CORS MANUAL] ✗ Origin not allowed or missing: ${origin}`);
        }
        next();
        return;
    });

    // More permissive rate limiting for development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const rateLimitConfig = isDevelopment
        ? {
            windowMs: 1 * 60 * 1000,
            limit: 5000,
            skip: (req: any) => {
                // Skip rate limiting for GPS tracking endpoints
                return req.path.includes('/update-location-live') ||
                    req.path.includes('/stop-location-tracking');
            }
        }
        : {
            windowMs: 15 * 60 * 1000,
            limit: 25000,
            skip: (req: any) => {
                // Skip rate limiting for GPS tracking endpoints to prevent 429 errors
                return req.path.includes('/update-location-live') ||
                    req.path.includes('/stop-location-tracking');
            }
        };

    applyStandardSecurity(app, { rateLimit: rateLimitConfig, trustProxy: true });
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
