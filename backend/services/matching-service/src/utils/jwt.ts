import jwt from 'jsonwebtoken';
import { AuthUser } from '../types';

function getSecret(): string {
    // Provide deterministic fallback consistent with integration tests
    return process.env.JWT_SECRET || 'fallback-secret';
}

export const verifyToken = (token: string): AuthUser & { id: string; role: string } => {
    const decoded = jwt.verify(token, getSecret()) as AuthUser;
    // Map JWT format to expected format for backward compatibility
    return {
        ...decoded,
        id: decoded.sub,  // Map 'sub' to 'id' for compatibility
        role: decoded.roles[0] || 'user'  // Use first role as primary role
    };
};