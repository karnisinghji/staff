import * as client from 'prom-client';

export interface MetricsBundle {
    registry: client.Registry;
    httpRequestsTotal: client.Counter<string>;
    httpRequestDurationMs: client.Histogram<string>;
}

export function createHttpMetrics(serviceName: string): MetricsBundle {
    const registry = new client.Registry();
    client.collectDefaultMetrics({ register: registry, labels: { service: serviceName } });

    const httpRequestsTotal = new client.Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'route', 'status_code', 'service']
    });

    const httpRequestDurationMs = new client.Histogram({
        name: 'http_request_duration_ms',
        help: 'Duration of HTTP requests in ms',
        labelNames: ['method', 'route', 'status_code', 'service'],
        buckets: [5, 10, 25, 50, 100, 250, 500, 1000]
    });

    registry.registerMetric(httpRequestsTotal);
    registry.registerMetric(httpRequestDurationMs);

    return { registry, httpRequestsTotal, httpRequestDurationMs };
}

export function metricsMiddleware(bundle: MetricsBundle) {
    return (req: any, res: any, next: any) => {
        const start = Date.now();
        res.on('finish', () => {
            const route = req.route?.path || req.path || 'unknown';
            const labels = { method: req.method, route, status_code: String(res.statusCode), service: (bundle as any).serviceName || '' };
            bundle.httpRequestsTotal.inc(labels);
            bundle.httpRequestDurationMs.observe(labels, Date.now() - start);
        });
        next();
    };
}

export function exposeMetricsEndpoint(app: any, bundle: MetricsBundle, path = '/metrics') {
    app.get(path, async (_req: any, res: any) => {
        res.set('Content-Type', bundle.registry.contentType);
        res.send(await bundle.registry.metrics());
    });
}
