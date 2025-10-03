"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("./logger");
// Get JWT secret dynamically to ensure env is loaded
const getJwtSecret = () => {
    const rawSecret = process.env.JWT_SECRET;
    if (!rawSecret) {
        if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
            logger_1.logger.warn('JWT_SECRET not set; using insecure local development fallback. DO NOT use in production.');
            return 'insecure-local-dev-secret';
        }
        else {
            throw new Error('JWT_SECRET is not defined for user-service. Token verification will fail.');
        }
    }
    return rawSecret;
};
const verifyToken = (token) => {
    const secret = getJwtSecret();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
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