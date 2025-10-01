import express from 'express';
import axios from 'axios';
import { logger } from '../utils/logger';

const router = express.Router();

// Service URLs
const SERVICES = {
    AUTH_SERVICE: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    USER_SERVICE: process.env.USER_SERVICE_URL || 'http://localhost:3002',
    MATCHING_SERVICE: process.env.MATCHING_SERVICE_URL || 'http://localhost:3003',
    COMMUNICATION_SERVICE: process.env.COMMUNICATION_SERVICE_URL || 'http://localhost:3004',
    NOTIFICATION_SERVICE: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
};

// Gateway health check
router.get('/', (req, res) => {
    res.json({
        service: 'API Gateway',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// Detailed health check with service status
router.get('/detailed', async (req, res) => {
    const healthChecks = await Promise.allSettled(
        Object.entries(SERVICES).map(async ([name, url]) => {
            try {
                const response = await axios.get(`${url}/health`, {
                    timeout: 5000,
                    headers: { 'User-Agent': 'API-Gateway-Health-Check' }
                });

                return {
                    service: name.toLowerCase().replace('_service', ''),
                    status: 'healthy',
                    url,
                    responseTime: response.headers['x-response-time'] || 'unknown',
                    data: response.data
                };
            } catch (error) {
                return {
                    service: name.toLowerCase().replace('_service', ''),
                    status: 'unhealthy',
                    url,
                    error: error instanceof Error ? error.message : 'Unknown error'
                };
            }
        })
    );

    const serviceResults = healthChecks.map(result =>
        result.status === 'fulfilled' ? result.value : {
            service: 'unknown',
            status: 'error',
            error: result.reason
        }
    );

    const overallStatus = serviceResults.every(service => service.status === 'healthy')
        ? 'healthy'
        : 'degraded';

    const healthData = {
        gateway: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0',
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
            }
        },
        services: serviceResults,
        overall: overallStatus
    };

    logger.info('Health check performed', {
        overallStatus,
        serviceCount: serviceResults.length,
        healthyServices: serviceResults.filter(s => s.status === 'healthy').length
    });

    res.status(overallStatus === 'healthy' ? 200 : 503).json(healthData);
});

// Individual service health checks
router.get('/service/:serviceName', async (req, res) => {
    const { serviceName } = req.params;
    const serviceKey = `${serviceName.toUpperCase()}_SERVICE` as keyof typeof SERVICES;
    const serviceUrl = SERVICES[serviceKey];

    if (!serviceUrl) {
        return res.status(404).json({
            success: false,
            message: `Service '${serviceName}' not found`,
            availableServices: Object.keys(SERVICES).map(key => key.toLowerCase().replace('_service', ''))
        });
    }

    try {
        const response = await axios.get(`${serviceUrl}/health`, {
            timeout: 10000,
            headers: { 'User-Agent': 'API-Gateway-Health-Check' }
        });

        res.json({
            service: serviceName,
            status: 'healthy',
            url: serviceUrl,
            data: response.data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error(`Health check failed for ${serviceName}:`, error);

        res.status(503).json({
            service: serviceName,
            status: 'unhealthy',
            url: serviceUrl,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
});

export { router as healthRouter };