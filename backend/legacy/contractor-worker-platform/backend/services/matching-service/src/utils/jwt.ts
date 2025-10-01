import jwt from 'jsonwebtoken';
import { AuthUser } from '../types';
import { logger } from './logger';

// Enforce presence of JWT_SECRET to avoid silent mismatch with 'fallback-secret'
const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
    logger.error('JWT_SECRET is not defined for matching-service. Refusing to start token verification.');
}

export const verifyToken = (token: string): AuthUser => {
    if (!rawSecret) {
        throw new Error('JWT secret not configured');
    }
    try {
        const decoded = jwt.verify(token, rawSecret) as AuthUser;
        return decoded;
    } catch (err: any) {
        logger.error(`JWT verification failed: ${err?.message || err}`);
        throw err;
    }
};