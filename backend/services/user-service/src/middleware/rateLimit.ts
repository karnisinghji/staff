import { Request, Response, NextFunction } from 'express';
import { recordPasswordReset } from '../observability/metrics';

interface Counter {
    count: number;
    resetAt: number; // epoch ms
}

// Simple in-memory rate limiter (per-key) – not for multi-process production.
export function createInMemoryRateLimiter({ limit, windowMs }: { limit: number; windowMs: number; }) {
    const buckets = new Map<string, Counter>();
    return function rateLimit(key: string): boolean {
        const now = Date.now();
        let entry = buckets.get(key);
        if (!entry || entry.resetAt <= now) {
            entry = { count: 0, resetAt: now + windowMs };
            buckets.set(key, entry);
        }
        entry.count += 1;
        if (entry.count > limit) return false;
        return true;
    };
}

// Middleware factory specifically for forgot-password endpoint
export function forgotPasswordRateLimit(options = { limit: 5, windowMs: 60_000 }) {
    const check = createInMemoryRateLimiter(options);
    return (req: Request, res: Response, next: NextFunction) => {
        const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';
        const email = (req.body && req.body.email ? String(req.body.email).toLowerCase() : 'no-email');
        const key = `${ip}:${email}`;
        if (!check(key)) {
            recordPasswordReset('rate_limited');
            res.status(429).json({ success: false, code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' });
            return;
        }
        next();
    };
}
