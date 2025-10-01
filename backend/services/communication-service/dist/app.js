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
// Attempt to load shared metrics utilities; fallback to local minimal registry
let shared = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    shared = require('../../shared');
}
catch {
    // silent; we'll fallback
}
function buildApp(version) {
    const app = (0, express_1.default)();
    const hex = (0, hexagon_1.buildCommunicationModule)(version);
    // Shared security (helmet + basic rate limit)
    (0, shared_1.applyStandardSecurity)(app, { rateLimit: true, trustProxy: true });
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('dev'));
    // Metrics setup
    if (shared) {
        const bundle = shared.createHttpMetrics('communication-service');
        app.use(shared.metricsMiddleware(bundle));
        shared.exposeMetricsEndpoint(app, bundle, '/metrics');
    }
    else {
        // Fallback: lightweight metrics using prom-client directly
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const client = require('prom-client');
            const registry = new client.Registry();
            client.collectDefaultMetrics({ register: registry, labels: { service: 'communication-service' } });
            const httpRequestsTotal = new client.Counter({ name: 'http_requests_total', help: 'Total HTTP requests', labelNames: ['method', 'route', 'status_code', 'service'] });
            const httpRequestDurationMs = new client.Histogram({ name: 'http_request_duration_ms', help: 'HTTP request duration ms', labelNames: ['method', 'route', 'status_code', 'service'], buckets: [5, 10, 25, 50, 100, 250, 500, 1000] });
            registry.registerMetric(httpRequestsTotal);
            registry.registerMetric(httpRequestDurationMs);
            app.use((req, res, next) => {
                const start = Date.now();
                res.on('finish', () => {
                    const route = req.route?.path || req.path || 'unknown';
                    const labels = { method: req.method, route, status_code: String(res.statusCode), service: 'communication-service' };
                    httpRequestsTotal.inc(labels);
                    httpRequestDurationMs.observe(labels, Date.now() - start);
                });
                next();
            });
            app.get('/metrics', async (_req, res) => {
                res.set('Content-Type', registry.contentType);
                res.send(await registry.metrics());
            });
        }
        catch {
            // final fallback: no metrics
        }
    }
    // Routes
    const startedAt = Date.now();
    app.get('/health', (_req, res) => {
        const domain = hex.useCases.getHealth.execute();
        res.json(buildHealthPayload('communication-service', process.env.npm_package_version, domain));
    });
    // Readiness: simple env + uptime gate (extend with external dependency checks later)
    app.get('/ready', (_req, res) => {
        const requiredEnv = ['NODE_ENV'];
        const missing = requiredEnv.filter(v => !process.env[v]);
        const notReady = missing.length > 0 || process.uptime() < 5; // small warmup window
        res.status(notReady ? 503 : 200).json({
            status: notReady ? 'not-ready' : 'ready',
            missingEnv: missing,
            uptimeSeconds: Math.round(process.uptime())
        });
    });
    const sendMessageSchema = zod_1.z.object({
        fromUserId: zod_1.z.string().min(1),
        toUserId: zod_1.z.string().min(1),
        body: zod_1.z.string().min(1).max(5000)
    });
    app.post('/messages', (0, shared_1.validate)({ schema: sendMessageSchema }), async (req, res) => {
        try {
            const msg = await hex.useCases.sendMessage.execute(req.body);
            res.status(201).json({ success: true, data: msg });
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message || 'Failed to send message' });
        }
    });
    const listMessagesQuery = zod_1.z.object({
        userId: zod_1.z.string().min(1),
        peerId: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional() // keep as string from query; parse later if needed
    });
    app.get('/messages', (0, shared_1.validate)({ schema: listMessagesQuery, target: 'query' }), async (req, res) => {
        try {
            const { userId, peerId } = req.query;
            const list = await hex.useCases.listMessages.execute({ userId, peerId, limit: 50 });
            res.json({ success: true, data: list });
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message || 'Failed to list messages' });
        }
    });
    const markReadParams = zod_1.z.object({ id: zod_1.z.string().min(1) });
    const markReadBody = zod_1.z.object({ readerId: zod_1.z.string().min(1) });
    app.post('/messages/:id/read', (0, shared_1.validate)({ schema: markReadParams, target: 'params' }), (0, shared_1.validate)({ schema: markReadBody }), async (req, res) => {
        try {
            const ok = await hex.useCases.markMessageRead.execute(req.params.id, req.body.readerId);
            if (!ok) {
                res.status(404).json({ success: false, message: 'Message not found or not accessible' });
                return;
            }
            res.json({ success: true });
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message || 'Failed to mark read' });
        }
    });
    // 404
    app.use((req, res) => {
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });
    // Error handler
    app.use((err, _req, res, _next) => {
        // Basic catch-all; can be enriched with logger
        res.status(500).json({ success: false, message: err?.message || 'Internal server error' });
    });
    return app;
}
exports.default = buildApp;
//# sourceMappingURL=app.js.map