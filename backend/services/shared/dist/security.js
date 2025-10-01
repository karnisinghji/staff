"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRateLimiter = buildRateLimiter;
exports.applyStandardSecurity = applyStandardSecurity;
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
function buildRateLimiter(opts) {
    return (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: { success: false, message: 'Too many requests, please try again later.' },
        ...opts
    });
}
function applyStandardSecurity(app, options = {}) {
    const { rateLimit: rl, windowMs, max, trustProxy } = options;
    if (trustProxy)
        app.set('trust proxy', 1);
    app.use((0, helmet_1.default)());
    if (rl) {
        let config;
        if (typeof rl === 'object')
            config = rl;
        if (windowMs)
            config = { ...(config || {}), windowMs };
        if (max)
            config = { ...(config || {}), limit: max };
        app.use(buildRateLimiter(config));
    }
}
//# sourceMappingURL=security.js.map