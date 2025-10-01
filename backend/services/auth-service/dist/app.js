"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./config/passport"));
// Security handled via shared helper
const shared_1 = require("../../shared");
// Health payload helper: prefer shared implementation via stable relative path (runtime-safe) with fallback.
let buildHealthPayload;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ({ buildHealthPayload } = { buildHealthPayload: shared_1.buildHealthPayload });
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
const hexagon_1 = require("./hexagon");
const shared_2 = require("../../shared");
const routes_1 = require("./http/routes");
const oauthRoutes_1 = require("./http/oauthRoutes");
let sharedMetrics = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sharedMetrics = require('../../shared');
}
catch { }
let sharedLoggerFactory = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sharedLoggerFactory = require('../../shared').createLogger;
}
catch { }
function buildApp(opts = {}) {
    const serviceName = opts.serviceName || 'auth-service';
    const logger = opts.logger || (sharedLoggerFactory ? sharedLoggerFactory(serviceName) : console);
    const metricsPath = opts.metricsPath || '/metrics';
    const app = (0, express_1.default)();
    app.locals.serviceName = serviceName;
    app.locals.logger = logger;
    // Initialize tracing lazily (no-op if env not set)
    (0, shared_1.startTracing)({ serviceName }).catch(err => logger.warn(`[tracing] init failed: ${err?.message}`));
    // CORS configuration - allow requests from frontend
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            process.env.FRONTEND_URL || 'http://localhost:5173'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    // Cast due to potential duplicate @types/express versions across service and shared packages
    app.use(shared_2.requestContextMiddleware);
    app.use(express_1.default.json());
    // Apply shared security defaults (helmet + rate limiter) enabling trust proxy for rate limiting when behind proxy
    (0, shared_1.applyStandardSecurity)(app, { rateLimit: true, trustProxy: true });
    // Metrics setup shared or fallback
    if (!opts.disableMetrics) {
        if (sharedMetrics) {
            try {
                const bundle = sharedMetrics.createHttpMetrics(serviceName);
                app.locals.metrics = bundle;
                app.use(sharedMetrics.metricsMiddleware(bundle));
                sharedMetrics.exposeMetricsEndpoint(app, bundle, metricsPath);
                logger.info(`[metrics] Using shared metrics for ${serviceName}`);
            }
            catch (e) {
                logger.warn(`[metrics] Failed shared metrics init: ${e?.message}`);
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
                logger.warn(`[metrics] Shared metrics unavailable. Fallback registry active for ${serviceName}`);
            }
            catch (e) {
                logger.error(`[metrics] Failed fallback metrics init: ${e?.message}`);
            }
        }
    }
    else {
        logger.warn('[metrics] Metrics disabled via options');
    }
    // Session configuration for OAuth
    app.use((0, express_session_1.default)({
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
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // Container & routes
    const container = (0, hexagon_1.buildContainer)();
    app.use('/api/auth', (0, routes_1.createAuthRoutes)(container));
    app.use('/api/auth', (0, oauthRoutes_1.createOAuthRoutes)());
    // Readiness registry (extend with DB / cache when available)
    const readiness = (0, shared_1.createReadinessRegistry)();
    // Example placeholder check (always ok) so shape remains consistent
    readiness.register('startupWarmup', async () => ({ name: 'startupWarmup', status: process.uptime() > 5 ? 'ok' : 'degraded' }));
    // Health simple endpoint (reflect metrics & version placeholders later if needed)
    app.get('/health', (_req, res) => {
        res.json(buildHealthPayload(serviceName, process.env.npm_package_version));
    });
    // Readiness endpoint
    app.get('/ready', async (_req, res) => {
        const agg = await (0, shared_1.runReadiness)(readiness, serviceName);
        const code = agg.overall === 'ok' ? 200 : agg.overall === 'degraded' ? 200 : 503;
        res.status(code).json(agg);
    });
    // 404 handler
    app.use((req, res) => {
        logger.warn(`404 ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: 'Not Found' });
    });
    // Error handler
    app.use((err, _req, res, _next) => {
        logger.error('Unhandled error', err);
        res.status(500).json({ success: false, message: err?.message || 'Internal error' });
    });
    return app;
}
exports.default = buildApp;
//# sourceMappingURL=app.js.map