"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getSecret() {
    // Provide deterministic fallback consistent with integration tests
    return process.env.JWT_SECRET || 'fallback-secret';
}
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, getSecret());
    // Map JWT format to expected format for backward compatibility
    return {
        ...decoded,
        id: decoded.sub, // Map 'sub' to 'id' for compatibility
        role: decoded.roles[0] || 'user' // Use first role as primary role
    };
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map