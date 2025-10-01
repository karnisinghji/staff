"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInMemoryRateLimiter = createInMemoryRateLimiter;
exports.forgotPasswordRateLimit = forgotPasswordRateLimit;
const metrics_1 = require("../observability/metrics");
// Simple in-memory rate limiter (per-key) – not for multi-process production.
function createInMemoryRateLimiter({ limit, windowMs }) {
    const buckets = new Map();
    return function rateLimit(key) {
        const now = Date.now();
        let entry = buckets.get(key);
        if (!entry || entry.resetAt <= now) {
            entry = { count: 0, resetAt: now + windowMs };
            buckets.set(key, entry);
        }
        entry.count += 1;
        if (entry.count > limit)
            return false;
        return true;
    };
}
// Middleware factory specifically for forgot-password endpoint
function forgotPasswordRateLimit(options = { limit: 5, windowMs: 60000 }) {
    const check = createInMemoryRateLimiter(options);
    return (req, res, next) => {
        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
        const email = (req.body && req.body.email ? String(req.body.email).toLowerCase() : 'no-email');
        const key = `${ip}:${email}`;
        if (!check(key)) {
            (0, metrics_1.recordPasswordReset)('rate_limited');
            res.status(429).json({ success: false, code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' });
            return;
        }
        next();
    };
}
//# sourceMappingURL=rateLimit.js.map