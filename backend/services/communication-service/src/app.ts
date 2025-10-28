import express from 'express';
import cors from 'cors';
import { applyStandardSecurity, validate } from './shared';
import { z } from 'zod';
import morgan from 'morgan';
import { readFileSync } from 'fs';
import { join } from 'path';
import { buildCommunicationModule } from './hexagon';

// Helper to get version from package.json
function getServiceVersion(): string {
    try {
        const pkgPath = join(__dirname, '..', 'package.json');
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        return pkg.version || '1.0.0';
    } catch {
        return '1.0.0';
    }
}

let buildHealthPayload: any;
try {
    ({ buildHealthPayload } = require('./shared/health'));
} catch {
    buildHealthPayload = (service: string, version?: string, domain?: any) => ({
        status: 'ok',
        service,
        version: version || getServiceVersion(),
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    });
}

// Attempt to load shared metrics utilities; fallback to local minimal registry
let shared: any = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    shared = require('./shared');
} catch {
    // silent; we'll fallback
}

export function buildApp(version: string): express.Express {
    const app = express();
    const hex = buildCommunicationModule(version);

    // Shared security (helmet + basic rate limit)
    applyStandardSecurity(app, { rateLimit: true, trustProxy: true });

    // CORS debugging logs
    console.log('----------------------------------------');
    console.log('CORS CONFIGURATION DEBUGGING');
    console.log('----------------------------------------');
    console.log('Environment variables:');
    console.log('- ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS);
    console.log('- CORS_ORIGINS:', process.env.CORS_ORIGINS);
    console.log('- CORS_ORIGIN:', process.env.CORS_ORIGIN);

    const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').filter(o => o.trim()) || [
        'https://karnisinghji.github.io',
        'https://comeondost.web.app',
        'https://comeondost.firebaseapp.com',
        'https://comeondost.netlify.app',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://localhost',  // Capacitor mobile app
        'capacitor://localhost'  // Alternative Capacitor scheme
    ];
    console.log('Configured allowed origins:');
    console.log(allowedOrigins);
    console.log('----------------------------------------');

    app.use(cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));
    app.use(express.json());
    app.use(morgan('dev'));

    // Metrics setup
    if (shared) {
        const bundle = shared.createHttpMetrics('communication-service');
        app.use(shared.metricsMiddleware(bundle));
        shared.exposeMetricsEndpoint(app, bundle, '/metrics');
    } else {
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
                    const route = (req as any).route?.path || req.path || 'unknown';
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
        } catch {
            // final fallback: no metrics
        }
    }

    // Routes
    const startedAt = Date.now();
    app.get('/health', (_req, res) => {
        const domain = hex.useCases.getHealth.execute();
        res.json(buildHealthPayload('communication-service', (process as any).env.npm_package_version, domain));
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

    const sendMessageSchema = z.object({
        fromUserId: z.string().min(1),
        toUserId: z.string().min(1),
        body: z.string().min(1).max(5000)
    });
    app.post('/messages', validate({ schema: sendMessageSchema }), async (req, res) => {
        try {
            const msg = await hex.useCases.sendMessage.execute(req.body);
            res.status(201).json({ success: true, data: msg });
        } catch (e: any) {
            res.status(500).json({ success: false, message: e.message || 'Failed to send message' });
        }
    });

    const listMessagesQuery = z.object({
        userId: z.string().min(1),
        peerId: z.string().optional(),
        limit: z.string().optional() // keep as string from query; parse later if needed
    });
    app.get('/messages', validate({ schema: listMessagesQuery, target: 'query' }), async (req, res) => {
        try {
            const { userId, peerId } = req.query as any;
            const list = await hex.useCases.listMessages.execute({ userId, peerId, limit: 50 });
            res.json({ success: true, data: list });
        } catch (e: any) {
            res.status(500).json({ success: false, message: e.message || 'Failed to list messages' });
        }
    });

    const markReadParams = z.object({ id: z.string().min(1) });
    const markReadBody = z.object({ readerId: z.string().min(1) });
    app.post('/messages/:id/read', validate({ schema: markReadParams, target: 'params' }), validate({ schema: markReadBody }), async (req, res) => {
        try {
            const ok = await hex.useCases.markMessageRead.execute(req.params.id, req.body.readerId);
            if (!ok) {
                res.status(404).json({ success: false, message: 'Message not found or not accessible' });
                return;
            }
            res.json({ success: true });
        } catch (e: any) {
            res.status(500).json({ success: false, message: e.message || 'Failed to mark read' });
        }
    });

    // Soft delete message
    const deleteMessageParams = z.object({ id: z.string().min(1) });
    app.delete('/messages/:id', validate({ schema: deleteMessageParams, target: 'params' }), async (req, res) => {
        try {
            // Get the repository from hexagon module (need to expose it)
            // For now, directly query the database
            const connectionString = process.env.DATABASE_URL;
            if (!connectionString) {
                res.status(500).json({ success: false, message: 'Database not configured' });
                return;
            }

            const { Pool } = require('pg');
            const pool = new Pool({
                connectionString,
                ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
            });

            const result = await pool.query(
                'UPDATE messages SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL',
                [req.params.id]
            );

            pool.end();

            if (!result.rowCount || result.rowCount === 0) {
                res.status(404).json({ success: false, message: 'Message not found' });
                return;
            }
            res.json({ success: true, message: 'Message deleted' });
        } catch (e: any) {
            res.status(500).json({ success: false, message: e.message || 'Failed to delete message' });
        }
    });

    // 404
    app.use((req, res) => {
        res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
    });

    // Error handler
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        // Basic catch-all; can be enriched with logger
        res.status(500).json({ success: false, message: err?.message || 'Internal server error' });
    });

    return app;
}

export default buildApp;
