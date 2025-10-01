"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequestDuration = exports.skillsListRequestsTotal = exports.passwordResetRequestsTotal = exports.userMetricsBundle = void 0;
exports.recordPasswordReset = recordPasswordReset;
exports.recordSkillsList = recordSkillsList;
exports.timingMiddleware = timingMiddleware;
// Lazy load shared metrics module from sibling service directory to avoid TS path resolution issues in isolated ts-jest
let createHttpMetrics;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    createHttpMetrics = require('../../../shared').createHttpMetrics;
}
catch (e1) {
    try {
        // Fallback path (when compiled output differs)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        createHttpMetrics = require('../../shared').createHttpMetrics;
    }
    catch (e2) {
        // Final fallback: provide a minimal local implementation so service/tests still function
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const client = require('prom-client');
        createHttpMetrics = function localCreateHttpMetrics(serviceName) {
            const registry = new client.Registry();
            client.collectDefaultMetrics({ register: registry, labels: { service: serviceName } });
            const httpRequestsTotal = new client.Counter({
                name: 'http_requests_total', help: 'Total number of HTTP requests', labelNames: ['method', 'route', 'status_code', 'service']
            });
            const httpRequestDurationMs = new client.Histogram({
                name: 'http_request_duration_ms', help: 'Duration of HTTP requests in ms', labelNames: ['method', 'route', 'status_code', 'service'], buckets: [5, 10, 25, 50, 100, 250, 500, 1000]
            });
            registry.registerMetric(httpRequestsTotal);
            registry.registerMetric(httpRequestDurationMs);
            return { registry, httpRequestsTotal, httpRequestDurationMs };
        };
    }
}
const prom_client_1 = __importDefault(require("prom-client"));
// This module bridges the shared HTTP metrics bundle with user-service specific domain metrics.
// It returns both the generic bundle and custom counters plus helper record functions used elsewhere.
exports.userMetricsBundle = createHttpMetrics('user-service');
// Custom counters/histograms specific to user domain
const passwordResetRequestsTotal = new prom_client_1.default.Counter({
    name: 'user_service_password_reset_requests_total',
    help: 'Total password reset requests received',
    labelNames: ['outcome'] // success|not_found|rate_limited|error
});
exports.passwordResetRequestsTotal = passwordResetRequestsTotal;
const skillsListRequestsTotal = new prom_client_1.default.Counter({
    name: 'user_service_skills_list_requests_total',
    help: 'Total skills list requests'
});
exports.skillsListRequestsTotal = skillsListRequestsTotal;
// We keep existing histogram name for continuity but register it in the shared registry
const httpRequestDuration = new prom_client_1.default.Histogram({
    name: 'user_service_http_request_duration_seconds',
    help: 'HTTP request duration histogram (service-specific granular labels)',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});
exports.httpRequestDuration = httpRequestDuration;
exports.userMetricsBundle.registry.registerMetric(passwordResetRequestsTotal);
exports.userMetricsBundle.registry.registerMetric(skillsListRequestsTotal);
exports.userMetricsBundle.registry.registerMetric(httpRequestDuration);
function recordPasswordReset(outcome) {
    passwordResetRequestsTotal.inc({ outcome });
}
function recordSkillsList() { skillsListRequestsTotal.inc(); }
// Timing helper (optional) similar to legacy implementation
function timingMiddleware(req, res, next) {
    const end = httpRequestDuration.startTimer({ method: req.method, route: req.route?.path || req.path });
    res.on('finish', () => { end({ status: res.statusCode }); });
    next();
}
//# sourceMappingURL=metrics.js.map