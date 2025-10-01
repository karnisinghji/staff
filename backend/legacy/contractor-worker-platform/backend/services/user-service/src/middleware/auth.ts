import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { logger } from '../utils/logger';
import { AuthUser } from '../types';

interface AuthRequest extends Request {
    user?: AuthUser;
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access token required'
            });
            return;
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        logger.error('Token verification failed:', error);
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

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
            res.status(403).json({
                success: false,
                message: 'Insufficient permissions'
            });
            return;
        }

        next();
    };
};