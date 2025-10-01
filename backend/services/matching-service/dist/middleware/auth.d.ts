import { Request, Response, NextFunction } from 'express';
import { AuthUser } from '../types';
interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const requireRole: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};
