import { Request, Response, NextFunction } from 'express';
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireRole: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
