import jwt from 'jsonwebtoken';
import { AuthUser } from '../types';

function getSecret(): string {
    // Provide deterministic fallback consistent with integration tests
    return process.env.JWT_SECRET || 'fallback-secret';
}

export const verifyToken = (token: string): AuthUser & { id: string; role: string } => {
    const decoded = jwt.verify(token, getSecret()) as any;
    // Map JWT format to expected format for backward compatibility
    // Support both new format (sub, roles) and old format (id, role)
    const userId = decoded.sub || decoded.id || decoded.userId;
    const userRole = decoded.roles?.[0] || decoded.role || 'user';

    if (!userId) {
        throw new Error('Token missing user ID (expected sub or id field)');
    }

    return {
        ...decoded,
        id: userId,
        role: userRole,
        sub: userId,  // Ensure sub is set
        roles: decoded.roles || [userRole]  // Ensure roles array exists
    };
};