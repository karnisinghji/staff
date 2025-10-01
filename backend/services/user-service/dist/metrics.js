"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = exports.httpRequestDuration = exports.skillsListRequestsTotal = exports.passwordResetRequestsTotal = void 0;
exports.timingMiddleware = timingMiddleware;
exports.recordPasswordReset = recordPasswordReset;
exports.recordSkillsList = recordSkillsList;
const prom_client_1 = __importDefault(require("prom-client"));
prom_client_1.default.collectDefaultMetrics();
// Custom metrics
exports.passwordResetRequestsTotal = new prom_client_1.default.Counter({
    name: 'user_service_password_reset_requests_total',
    help: 'Total password reset requests received',
    labelNames: ['outcome'] // outcome: success|not_found|rate_limited|error
});
exports.skillsListRequestsTotal = new prom_client_1.default.Counter({
    name: 'user_service_skills_list_requests_total',
    help: 'Total skills list requests'
});
exports.httpRequestDuration = new prom_client_1.default.Histogram({
    name: 'user_service_http_request_duration_seconds',
    help: 'HTTP request duration histogram',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});
// Lightweight middleware to observe request timings (registered in index if desired)
function timingMiddleware(req, res, next) {
    const end = exports.httpRequestDuration.startTimer({ method: req.method, route: req.route?.path || req.path });
    res.on('finish', () => {
        end({ status: res.statusCode });
    });
    next();
}
function recordPasswordReset(outcome) {
    exports.passwordResetRequestsTotal.inc({ outcome });
}
function recordSkillsList() { exports.skillsListRequestsTotal.inc(); }
const metricsMiddleware = (_req, res) => {
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(prom_client_1.default.register.metrics());
};
exports.metricsMiddleware = metricsMiddleware;
//# sourceMappingURL=metrics.js.map