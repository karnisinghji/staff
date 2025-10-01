import { Request, Response, NextFunction } from 'express';
export declare function createInMemoryRateLimiter({ limit, windowMs }: {
    limit: number;
    windowMs: number;
}): (key: string) => boolean;
export declare function forgotPasswordRateLimit(options?: {
    limit: number;
    windowMs: number;
}): (req: Request, res: Response, next: NextFunction) => void;
