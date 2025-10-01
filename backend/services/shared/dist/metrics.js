"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpMetrics = createHttpMetrics;
exports.metricsMiddleware = metricsMiddleware;
exports.exposeMetricsEndpoint = exposeMetricsEndpoint;
const client = __importStar(require("prom-client"));
function createHttpMetrics(serviceName) {
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
function metricsMiddleware(bundle) {
    return (req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
            const route = req.route?.path || req.path || 'unknown';
            const labels = { method: req.method, route, status_code: String(res.statusCode), service: bundle.serviceName || '' };
            bundle.httpRequestsTotal.inc(labels);
            bundle.httpRequestDurationMs.observe(labels, Date.now() - start);
        });
        next();
    };
}
function exposeMetricsEndpoint(app, bundle, path = '/metrics') {
    app.get(path, async (_req, res) => {
        res.set('Content-Type', bundle.registry.contentType);
        res.send(await bundle.registry.metrics());
    });
}
//# sourceMappingURL=metrics.js.map