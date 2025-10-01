"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("./logger");
// Enforce presence of JWT_SECRET; provide an explicit local dev fallback to avoid immediate crashes
let rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        rawSecret = 'insecure-local-dev-secret';
        logger_1.logger.warn('JWT_SECRET not set; using insecure local development fallback. DO NOT use in production.');
    }
    else {
        logger_1.logger.error('JWT_SECRET is not defined for user-service. Token verification will throw until configured.');
    }
}
const verifyToken = (token) => {
    if (!rawSecret) {
        throw new Error('JWT secret not configured');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, rawSecret);
        // Map auth-service token format to user-service AuthUser format
        return {
            id: decoded.sub || decoded.id,
            email: decoded.email || '', // email might not be in token
            role: decoded.roles?.[0] || decoded.role || 'user' // Take first role from array
        };
    }
    catch (err) {
        logger_1.logger.error(`JWT verification failed (user-service): ${err?.message || err}`);
        throw err;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map