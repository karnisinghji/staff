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
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const invitationRoutes_1 = __importDefault(require("./routes/invitationRoutes"));
const logger_1 = require("./utils/logger");
const DomainErrors_1 = require("./hexagon/domain/errors/DomainErrors");
const metrics_1 = require("./observability/metrics");
// Shared metrics placeholders (resolved at build time)
let exposeMetricsEndpoint = null;
let sharedMetricsMiddlewareFactory = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const shared = require('../../shared');
    exposeMetricsEndpoint = shared.exposeMetricsEndpoint;
    sharedMetricsMiddlewareFactory = shared.metricsMiddleware;
}
catch (e) {
    logger_1.logger.warn('Shared metrics module unavailable, HTTP level metrics disabled');
}
/**
 * buildApp
 * Central factory that constructs and configures the Express application for the user-service.
 * This isolates infrastructure wiring from process bootstrap (env loading, listening) enabling:
 *  - Reuse in tests without side effects (no implicit server listen)
 *  - Future dependency injection (pass fakes/mocks) by extending options signature
 *  - Consistent instrumentation & error-handling assembly.
 */
function buildApp() {
    const app = (0, express_1.default)();
    const serviceName = 'user-service';
    (0, shared_1.startTracing)({ serviceName }).catch(err => logger_1.logger.warn(`[tracing] init failed: ${err?.message}`));
    // Security middleware (shared) + custom headers
    (0, shared_1.applyStandardSecurity)(app, { rateLimit: true, trustProxy: true });
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
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            ...(process.env.ALLOWED_ORIGINS?.split(',').filter(o => o) || [])
        ],
        credentials: true
    }));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    // Redaction helper
    function redact(line) {
        return line
            .replace(/(authorization|auth|token)=([^\s]+)/gi, '$1=[REDACTED]')
            .replace(/("password"\s*:\s*")[^"]+"/gi, '"password":"[REDACTED]"');
    }
    app.use((0, morgan_1.default)('combined', {
        stream: { write: (message) => logger_1.logger.info(redact(message.trim())) }
    }));
    // Metrics & HTTP instrumentation
    if (sharedMetricsMiddlewareFactory) {
        app.use(sharedMetricsMiddlewareFactory(metrics_1.userMetricsBundle));
    }
    else {
        app.use((req, res, next) => {
            const start = Date.now();
            res.on('finish', () => {
                const route = req.route?.path || req.path || 'unknown';
                const labels = { method: req.method, route, status_code: String(res.statusCode), service: 'user-service' };
                const anyBundle = metrics_1.userMetricsBundle;
                if (anyBundle.httpRequestsTotal)
                    anyBundle.httpRequestsTotal.inc(labels);
                if (anyBundle.httpRequestDurationMs)
                    anyBundle.httpRequestDurationMs.observe(labels, Date.now() - start);
            });
            next();
        });
    }
    if (exposeMetricsEndpoint) {
        exposeMetricsEndpoint(app, metrics_1.userMetricsBundle, '/metrics');
    }
    else {
        app.get('/metrics', async (_req, res) => {
            res.set('Content-Type', metrics_1.userMetricsBundle.registry.contentType);
            res.send(await metrics_1.userMetricsBundle.registry.metrics());
        });
    }
    // Readiness endpoint (extend with DB connectivity check when available)
    const readiness = (0, shared_1.createReadinessRegistry)();
    readiness.register('env', async () => ({ name: 'env', status: ['JWT_SECRET'].every(v => !!process.env[v]) ? 'ok' : 'failed' }));
    readiness.register('warmup', () => ({ name: 'warmup', status: process.uptime() > 5 ? 'ok' : 'degraded' }));
    app.get('/ready', async (_req, res) => {
        const agg = await (0, shared_1.runReadiness)(readiness, serviceName);
        const code = agg.overall === 'failed' ? 503 : 200;
        res.status(code).json(agg);
    });
    // Routes
    app.use('/', userRoutes_1.default);
    app.use('/', invitationRoutes_1.default);
    // 404 handler
    app.use((req, res) => {
        logger_1.logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });
    // Global error handler
    app.use((error, req, res, _next) => {
        if (error instanceof DomainErrors_1.DomainError) {
            logger_1.logger.warn(`Domain error ${error.code}: ${error.message}`);
            res.status(error.status).json({ success: false, code: error.code, message: error.message, details: error.details });
            return;
        }
        logger_1.logger.error('Unhandled error:', error);
        res.status(500).json({ success: false, code: 'INTERNAL_ERROR', message: 'Internal server error' });
    });
    return app;
}
exports.default = buildApp;
//# sourceMappingURL=app.js.map