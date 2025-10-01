import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let error = { ...err };
    error.message = err.message;

    // Log the error with request context
    logger.error('API Gateway Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        userAgent: req.get('user-agent'),
        ip: req.ip,
        timestamp: new Date().toISOString()
    });

    // Microservice connection errors
    if (err.code === 'ECONNREFUSED') {
        const message = 'Service temporarily unavailable';
        error = new AppError(message, 503);
    } else if (err.code === 'ETIMEDOUT') {
        const message = 'Service timeout';
        error = new AppError(message, 504);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = new AppError(message, 401);
    } else if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = new AppError(message, 401);
    }

    // Rate limit errors
    if (err.status === 429) {
        const message = 'Too many requests';
        error = new AppError(message, 429);
    }

    // Default error response
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            statusCode,
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                details: err
            })
        },
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method
    });
};

// Catch async errors
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);