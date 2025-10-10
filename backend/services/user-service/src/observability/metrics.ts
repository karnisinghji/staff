// Lazy load shared metrics module from sibling service directory to avoid TS path resolution issues in isolated ts-jest
let createHttpMetrics: any;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    createHttpMetrics = require('../shared').createHttpMetrics;
} catch (e1) {
    try {
        // Fallback path (when compiled output differs)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        createHttpMetrics = require('../shared').createHttpMetrics;
    } catch (e2) {
        // Final fallback: provide a minimal local implementation so service/tests still function
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const client = require('prom-client');
        createHttpMetrics = function localCreateHttpMetrics(serviceName: string) {
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
import client from 'prom-client';

// This module bridges the shared HTTP metrics bundle with user-service specific domain metrics.
// It returns both the generic bundle and custom counters plus helper record functions used elsewhere.

export const userMetricsBundle = createHttpMetrics('user-service');

// Custom counters/histograms specific to user domain
const passwordResetRequestsTotal = new client.Counter({
    name: 'user_service_password_reset_requests_total',
    help: 'Total password reset requests received',
    labelNames: ['outcome'] as const // success|not_found|rate_limited|error
});

const skillsListRequestsTotal = new client.Counter({
    name: 'user_service_skills_list_requests_total',
    help: 'Total skills list requests'
});

// We keep existing histogram name for continuity but register it in the shared registry
const httpRequestDuration = new client.Histogram({
    name: 'user_service_http_request_duration_seconds',
    help: 'HTTP request duration histogram (service-specific granular labels)',
    labelNames: ['method', 'route', 'status'] as const,
    buckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});

userMetricsBundle.registry.registerMetric(passwordResetRequestsTotal);
userMetricsBundle.registry.registerMetric(skillsListRequestsTotal);
userMetricsBundle.registry.registerMetric(httpRequestDuration);

export function recordPasswordReset(outcome: 'success' | 'not_found' | 'rate_limited' | 'error') {
    passwordResetRequestsTotal.inc({ outcome });
}
export function recordSkillsList() { skillsListRequestsTotal.inc(); }

// Timing helper (optional) similar to legacy implementation
export function timingMiddleware(req: any, res: any, next: any) {
    const end = httpRequestDuration.startTimer({ method: req.method, route: req.route?.path || req.path });
    res.on('finish', () => { end({ status: res.statusCode }); });
    next();
}

export { passwordResetRequestsTotal, skillsListRequestsTotal, httpRequestDuration };
