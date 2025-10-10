import helmet from 'helmet';
import rateLimit, { Options as RateLimitOptions } from 'express-rate-limit';
// Deliberately avoid importing the specific Express type from root to prevent multiple @types/express instance conflicts.
// Use a minimal structural type instead.
type ExpressLike = {
    use: (...args: any[]) => any;
    set: (key: string, val: any) => any;
};

export interface SecurityOptions {
    rateLimit?: boolean | Partial<RateLimitOptions>;
    windowMs?: number; // convenience
    max?: number;      // convenience
    trustProxy?: boolean;
}

export function buildRateLimiter(opts?: Partial<RateLimitOptions>) {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: { success: false, message: 'Too many requests, please try again later.' },
        ...opts
    });
}

export function applyStandardSecurity(app: ExpressLike, options: SecurityOptions = {}) {
    const { rateLimit: rl, windowMs, max, trustProxy } = options;
    if (trustProxy) app.set('trust proxy', 1);
    app.use(helmet());
    if (rl) {
        let config: Partial<RateLimitOptions> | undefined;
        if (typeof rl === 'object') config = rl;
        if (windowMs) config = { ...(config || {}), windowMs };
        if (max) config = { ...(config || {}), limit: max };
        app.use(buildRateLimiter(config));
    }
}
