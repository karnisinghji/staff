import * as client from 'prom-client';
export interface MetricsBundle {
    registry: client.Registry;
    httpRequestsTotal: client.Counter<string>;
    httpRequestDurationMs: client.Histogram<string>;
}
export declare function createHttpMetrics(serviceName: string): MetricsBundle;
export declare function metricsMiddleware(bundle: MetricsBundle): (req: any, res: any, next: any) => void;
export declare function exposeMetricsEndpoint(app: any, bundle: MetricsBundle, path?: string): void;
