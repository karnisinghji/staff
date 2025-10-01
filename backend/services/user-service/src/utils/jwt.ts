import jwt from 'jsonwebtoken';
import { AuthUser } from '../types';
import { logger } from './logger';

// Get JWT secret dynamically to ensure env is loaded
const getJwtSecret = (): string => {
    const rawSecret = process.env.JWT_SECRET;
    if (!rawSecret) {
        if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
            logger.warn('JWT_SECRET not set; using insecure local development fallback. DO NOT use in production.');
            return 'insecure-local-dev-secret';
        } else {
            throw new Error('JWT_SECRET is not defined for user-service. Token verification will fail.');
        }
    }
    return rawSecret;
};

export const verifyToken = (token: string): AuthUser => {
    const secret = getJwtSecret();
    try {
        const decoded = jwt.verify(token, secret) as any;

        // Map auth-service token format to user-service AuthUser format
        return {
            id: decoded.sub || decoded.id,
            email: decoded.email || '', // email might not be in token
            role: decoded.roles?.[0] || decoded.role || 'user' // Take first role from array
        };
    } catch (err: any) {
        logger.error(`JWT verification failed (user-service): ${err?.message || err}`);
        throw err;
    }
};