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

    // Log the error
    logger.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });

    // PostgreSQL error codes
    if (err.code === '23505') {
        // Unique violation
        const message = 'Resource already exists';
        error = new AppError(message, 409);
    } else if (err.code === '23503') {
        // Foreign key violation
        const message = 'Referenced resource does not exist';
        error = new AppError(message, 400);
    } else if (err.code === '23502') {
        // Not null violation
        const message = 'Required field is missing';
        error = new AppError(message, 400);
    } else if (err.code === '42P01') {
        // Undefined table
        const message = 'Database error';
        error = new AppError(message, 500);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = new AppError(message, 401);
    } else if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = new AppError(message, 401);
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        const message = 'Invalid input data';
        error = new AppError(message, 400);
    }

    // Send error response
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
            stack: error.stack,
            error: err
        })
    });
};

// Catch async errors
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);