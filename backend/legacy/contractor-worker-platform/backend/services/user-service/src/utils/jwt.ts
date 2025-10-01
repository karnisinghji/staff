import jwt from 'jsonwebtoken';
import { AuthUser } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export const verifyToken = (token: string): AuthUser => {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
};