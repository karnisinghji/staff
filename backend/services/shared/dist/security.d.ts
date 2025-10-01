import { Options as RateLimitOptions } from 'express-rate-limit';
type ExpressLike = {
    use: (...args: any[]) => any;
    set: (key: string, val: any) => any;
};
export interface SecurityOptions {
    rateLimit?: boolean | Partial<RateLimitOptions>;
    windowMs?: number;
    max?: number;
    trustProxy?: boolean;
}
export declare function buildRateLimiter(opts?: Partial<RateLimitOptions>): import("express-rate-limit").RateLimitRequestHandler;
export declare function applyStandardSecurity(app: ExpressLike, options?: SecurityOptions): void;
export {};
