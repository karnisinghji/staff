"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const shared_1 = require("../../shared");
const morgan_1 = __importDefault(require("morgan"));
const matchingRoutes_1 = __importDefault(require("./routes/matchingRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const logger_1 = require("./utils/logger");
// Attempt shared metrics; fallback to local lightweight registry
let sharedFactory = null;
let exposeMetricsEndpoint = null;
let sharedMiddleware = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const m = require('../../shared');
    sharedFactory = m.createHttpMetrics;
    exposeMetricsEndpoint = m.exposeMetricsEndpoint;
    sharedMiddleware = m.metricsMiddleware;
}
catch (e) {
    logger_1.logger.warn(`Shared metrics module unavailable: ${e?.message || e}`);
}
function buildApp() {
    const app = (0, express_1.default)();
    (0, shared_1.applyStandardSecurity)(app, { rateLimit: true, trustProxy: true });
    app.use((0, cors_1.default)({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true
    }));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)('combined', { stream: { write: (msg) => logger_1.logger.info(msg.trim()) } }));
    // Metrics
    let metricsBundle = null;
    if (sharedFactory) {
        metricsBundle = sharedFactory('matching-service');
        if (sharedMiddleware)
            app.use(sharedMiddleware(metricsBundle));
        if (exposeMetricsEndpoint)
            exposeMetricsEndpoint(app, metricsBundle, '/metrics');
    }
    else {
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
                const route = req.route?.path || req.path || 'unknown';
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
    app.use('/', matchingRoutes_1.default);
    app.use('/', adminRoutes_1.default);
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
        logger_1.logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });
    // Error handler (generic; domain specific errors can be added later)
    app.use((error, req, res, _next) => {
        logger_1.logger.error('Unhandled error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    });
    return app;
}
exports.default = buildApp;
//# sourceMappingURL=app.js.map