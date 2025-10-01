"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const shared_1 = require("../../shared");
const zod_1 = require("zod");
const morgan_1 = __importDefault(require("morgan"));
const hexagon_1 = require("./hexagon");
let buildHealthPayload;
try {
    ({ buildHealthPayload } = require('../../shared/src/health'));
}
catch {
    buildHealthPayload = (service, version, domain) => ({
        status: 'ok',
        service,
        version: version || process.env.npm_package_version || 'unknown',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    });
}
let shared = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    shared = require('../../shared');
}
catch {
    // silent; fallback handled below
}
/**
 * Build the Notification Service Express app.
 * Supports two invocation forms for backward compatibility:
 *  - buildApp('1.0.0')
 *  - buildApp({ version: '1.0.0', serviceName: 'notification-service' })
 */
function buildApp(versionOrOptions) {
    let options;
    if (typeof versionOrOptions === 'string' || versionOrOptions === undefined) {
        options = { version: versionOrOptions, serviceName: 'notification-service' };
    }
    else {
        options = { serviceName: 'notification-service', metricsPath: '/metrics', ...versionOrOptions };
    }
    const serviceName = options.serviceName || 'notification-service';
    const metricsPath = options.metricsPath || '/metrics';
    const version = options.version || '0.0.0';
    const logger = options.logger || console;
    const app = (0, express_1.default)();
    const hex = (0, hexagon_1.buildNotificationModule)(version);
    app.locals.serviceName = serviceName;
    app.locals.version = version;
    (0, shared_1.applyStandardSecurity)(app, { rateLimit: true, trustProxy: true });
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('dev'));
    if (!options.disableMetrics) {
        if (shared) {
            try {
                const bundle = shared.createHttpMetrics(serviceName);
                app.locals.metrics = bundle; // expose for tests / introspection
                app.use(shared.metricsMiddleware(bundle));
                shared.exposeMetricsEndpoint(app, bundle, metricsPath);
                logger.info(`[metrics] Using shared metrics module for ${serviceName} at ${metricsPath}`);
            }
            catch (e) {
                logger.warn(`[metrics] Shared metrics initialization failed: ${e?.message}`);
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
                        const route = req.route?.path || req.path || 'unknown';
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
            }
            catch (e) {
                logger.error(`[metrics] Failed to init fallback metrics: ${e?.message}`);
            }
        }
    }
    else {
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
    const sendNotificationSchema = zod_1.z.object({
        userId: zod_1.z.string().min(1),
        channel: zod_1.z.string().min(1),
        template: zod_1.z.string().min(1),
        data: zod_1.z.record(zod_1.z.any()).optional()
    });
    app.post('/notifications', (0, shared_1.validate)({ schema: sendNotificationSchema }), async (req, res) => {
        try {
            const result = await hex.useCases.sendNotification.execute({ ...req.body, data: req.body.data || {} });
            res.status(result.status === 'failed' ? 422 : 201).json({ success: result.status === 'sent', data: result });
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message || 'Failed to send notification' });
        }
    });
    // 404
    app.use((req, res) => {
        logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });
    // Error handler
    app.use((err, _req, res, _next) => {
        logger.error('Unhandled error in notification-service', err);
        res.status(500).json({ success: false, message: err?.message || 'Internal server error' });
    });
    return app;
}
exports.default = buildApp;
//# sourceMappingURL=app.js.map