import client from 'prom-client';
// Prometheus metrics setup
client.collectDefaultMetrics();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { setupProxyRoutes } from './routes/proxyRoutes';
import { healthRouter } from './routes/health';

// Load environment variables
dotenv.config({ path: '../../.env' });

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Enhanced Rate limiting: per IP and per API key
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // default 15 min
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
const RATE_LIMIT_AUTH_MAX = parseInt(process.env.RATE_LIMIT_AUTH_MAX || '10', 10);

import type { Request } from 'express';
const keyGenerator = (req: Request) => {
    // Prefer API key if present, else fallback to IP
    const apiKey = req.headers['x-api-key'];
    if (typeof apiKey === 'string') return apiKey;
    return req.ip || '';
};
// Prometheus metrics endpoint (after app declaration)
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
    keyGenerator,
    message: {
        error: 'Too many requests from this IP or API key, please try again later.',
        retryAfter: `${Math.floor(RATE_LIMIT_WINDOW_MS / 60000)} minutes`
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_AUTH_MAX,
    keyGenerator,
    message: {
        error: 'Too many authentication attempts, please try again later.',
        retryAfter: `${Math.floor(RATE_LIMIT_WINDOW_MS / 60000)} minutes`
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/auth', authLimiter);
app.use(limiter);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined', {
    stream: { write: (message: string) => logger.info(message.trim()) }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check routes
app.use('/health', healthRouter);

// API Gateway info endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'API Gateway',
        version: '1.0.0',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/api/auth/*',
            users: '/api/users/*',
            matching: '/api/matching/*',
            communication: '/api/communication/*',
            notifications: '/api/notifications/*',
            health: '/health'
        }
    });
});

// Setup proxy routes to microservices
setupProxyRoutes(app);

// Error handling middleware (must be last)
app.use(errorHandler);

// Handle 404
app.use('*', (req, res) => {
    logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

app.listen(PORT, () => {
    logger.info(`🚪 API Gateway running on port ${PORT}`);
    logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
    logger.info(`📋 Gateway info available at http://localhost:${PORT}/`);
});

export default app;