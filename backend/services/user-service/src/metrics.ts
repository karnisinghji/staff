import client from 'prom-client';
import type { Request, Response } from 'express';

client.collectDefaultMetrics();

// Custom metrics
export const passwordResetRequestsTotal = new client.Counter({
    name: 'user_service_password_reset_requests_total',
    help: 'Total password reset requests received',
    labelNames: ['outcome'] as const // outcome: success|not_found|rate_limited|error
});

export const skillsListRequestsTotal = new client.Counter({
    name: 'user_service_skills_list_requests_total',
    help: 'Total skills list requests'
});

export const httpRequestDuration = new client.Histogram({
    name: 'user_service_http_request_duration_seconds',
    help: 'HTTP request duration histogram',
    labelNames: ['method', 'route', 'status'] as const,
    buckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});

// Lightweight middleware to observe request timings (registered in index if desired)
export function timingMiddleware(req: Request, res: Response, next: Function) {
    const end = httpRequestDuration.startTimer({ method: req.method, route: req.route?.path || req.path });
    res.on('finish', () => {
        end({ status: res.statusCode });
    });
    next();
}

export function recordPasswordReset(outcome: 'success' | 'not_found' | 'rate_limited' | 'error') {
    passwordResetRequestsTotal.inc({ outcome });
}
export function recordSkillsList() { skillsListRequestsTotal.inc(); }

export const metricsMiddleware = (_req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
};
