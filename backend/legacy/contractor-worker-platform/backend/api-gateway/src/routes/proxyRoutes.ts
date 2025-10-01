import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { logger } from '../utils/logger';
import { authenticateToken, requireRole, requestLogger } from '../middleware/auth';

// Service URLs from environment variables
const SERVICES = {
    AUTH_SERVICE: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    USER_SERVICE: process.env.USER_SERVICE_URL || 'http://localhost:3002',
    MATCHING_SERVICE: process.env.MATCHING_SERVICE_URL || 'http://localhost:3003',
    COMMUNICATION_SERVICE: process.env.COMMUNICATION_SERVICE_URL || 'http://localhost:3004',
    NOTIFICATION_SERVICE: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
};

// Common proxy options
function generateRequestId() {
    return 'req-' + Math.random().toString(36).substr(2, 9);
}

const createProxyOptions = (target: string, serviceName: string) => ({
    target,
    changeOrigin: true,
    pathRewrite: {
        [`^/api/${serviceName.toLowerCase()}`]: '',
    },
    onError: (err: any, req: any, res: any) => {
        logger.error(`Proxy error for ${serviceName}:`, {
            error: err.message,
            target,
            path: req.url,
            method: req.method
        });

        // Simple retry logic: try up to 2 more times
        const maxRetries = 3;
        req._proxyRetries = req._proxyRetries || 0;
        if (req._proxyRetries < maxRetries) {
            req._proxyRetries++;
            logger.warn(`Retrying proxy request to ${serviceName} (attempt ${req._proxyRetries})`);
            setTimeout(() => {
                // Re-attempt the proxy request
                req.socket.emit('data', Buffer.from('')); // triggers re-processing
            }, 250);
            return;
        }

        // Circuit-breaker: fallback response after retries
        res.status(503).json({
            success: false,
            message: `${serviceName} is currently unavailable after ${maxRetries} attempts`,
            error: 'Service connection failed',
            timestamp: new Date().toISOString()
        });
    },
    onProxyReq: (proxyReq: any, req: any, res: any) => {
        // Forward Authorization header
        if (req.headers['authorization']) {
            proxyReq.setHeader('authorization', req.headers['authorization']);
        }
        // Forward x-request-id header, or generate one if missing
        const requestId = req.headers['x-request-id'] || generateRequestId();
        proxyReq.setHeader('x-request-id', requestId);
        logger.info(`Proxying request to ${serviceName}:`, {
            method: req.method,
            path: req.url,
            target: `${target}${req.url}`,
            authorization: req.headers['authorization'],
            'x-request-id': requestId
        });

        // Body forwarding fix for POST/PUT requests
        if ((req.method === 'POST' || req.method === 'PUT') && req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },

    onProxyRes: (proxyRes: any, req: any, res: any) => {
        logger.info(`Response from ${serviceName}:`, {
            statusCode: proxyRes.statusCode,
            method: req.method,
            path: req.url
        });
    },
    timeout: 30000, // 30 seconds
    proxyTimeout: 30000,
});

export const setupProxyRoutes = (app: Express): void => {
    // Add request logging to all API routes
    app.use('/api/*', requestLogger);

    // Auth Service Routes (Public + Protected)
    // Public auth routes (signup, login)
    app.use('/api/auth', createProxyMiddleware({
        ...createProxyOptions(SERVICES.AUTH_SERVICE, 'Auth'),
        pathRewrite: { '^/api/auth': '/api/auth' }
    }));

    // User Service Routes (Protected)
    app.use('/api/users',
        authenticateToken,
        createProxyMiddleware({
            ...createProxyOptions(SERVICES.USER_SERVICE, 'User'),
            pathRewrite: { '^/api/users': '/api/users' }
        })
    );

    // Matching Service Routes (Protected)
    app.use('/api/matching',
        authenticateToken,
        createProxyMiddleware({
            ...createProxyOptions(SERVICES.MATCHING_SERVICE, 'Matching'),
            pathRewrite: { '^/api/matching': '/api/matching' }
        })
    );

    // Communication Service Routes (Protected)
    app.use('/api/communication',
        authenticateToken,
        createProxyMiddleware({
            ...createProxyOptions(SERVICES.COMMUNICATION_SERVICE, 'Communication'),
            pathRewrite: { '^/api/communication': '/api/communication' }
        })
    );

    // Notification Service Routes (Protected)
    app.use('/api/notifications',
        authenticateToken,
        createProxyMiddleware({
            ...createProxyOptions(SERVICES.NOTIFICATION_SERVICE, 'Notification'),
            pathRewrite: { '^/api/notifications': '/api/notifications' }
        })
    );

    // Admin routes (require specific roles)
    app.use('/api/admin/*',
        authenticateToken,
        requireRole(['admin']),
        createProxyMiddleware({
            target: SERVICES.USER_SERVICE,
            changeOrigin: true,
            pathRewrite: { '^/api/admin': '/api/admin' }
        })
    );

    logger.info('Proxy routes configured for all microservices');
    logger.info('Service URLs:', SERVICES);
};