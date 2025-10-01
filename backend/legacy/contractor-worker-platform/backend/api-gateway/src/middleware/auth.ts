import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { logger } from '../utils/logger';

interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

// JWT token authentication middleware
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Access token is required'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        logger.info(`Authenticated user: ${decoded.email} (${decoded.role})`);
        next();
    } catch (error) {
        logger.warn(`Authentication failed: ${error}`);
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

// Role-based authorization middleware
export const requireRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            logger.warn(`Access denied for user ${req.user.email}: required roles ${roles}, user role ${req.user.role}`);
            res.status(403).json({
                success: false,
                message: 'Insufficient permissions'
            });
            return;
        }

        next();
    };
};

// Service health check middleware
export const checkServiceHealth = (serviceUrl: string, serviceName: string) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const response = await axios.get(`${serviceUrl}/health`, {
                timeout: 5000,
                headers: {
                    'User-Agent': 'API-Gateway-Health-Check'
                }
            });

            if (response.status === 200) {
                next();
            } else {
                throw new Error(`Service unhealthy: ${response.status}`);
            }
        } catch (error) {
            logger.error(`Service health check failed for ${serviceName}:`, error);
            res.status(503).json({
                success: false,
                message: `${serviceName} is currently unavailable`,
                service: serviceName,
                timestamp: new Date().toISOString()
            });
        }
    };
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            contentLength: res.get('content-length') || 0,
            userAgent: req.get('user-agent'),
            ip: req.ip,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        };

        if (res.statusCode >= 400) {
            logger.warn('Request completed with error', logData);
        } else {
            logger.info('Request completed successfully', logData);
        }
    });

    next();
};