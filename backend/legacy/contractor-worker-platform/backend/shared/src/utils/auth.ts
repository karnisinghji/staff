import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const SALT_ROUNDS = 10;

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

// JWT token operations
export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
}

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const extractTokenFromHeader = (authHeader: string | undefined): string => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided');
    }
    return authHeader.substring(7);
};

// Middleware for token authentication
export const authenticateToken = (req: any, res: any, next: any) => {
    try {
        const token = extractTokenFromHeader(req.headers.authorization);
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Unauthorized'
        });
    }
};

// Role-based authorization middleware
export const authorizeRole = (roles: UserRole[]) => {
    return (req: any, res: any, next: any) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Forbidden: Insufficient permissions'
            });
        }
        next();
    };
};