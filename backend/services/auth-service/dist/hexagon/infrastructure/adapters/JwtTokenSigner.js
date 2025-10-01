"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenSigner = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.JWT_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
class JwtTokenSigner {
    signAccessToken(payload, expiresIn) {
        const options = { expiresIn };
        return jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, options);
    }
    signRefreshToken(payload, expiresIn) {
        const options = { expiresIn };
        return jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, options);
    }
    verify(token) {
        // Try access then refresh secret
        try {
            return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        }
        catch {
            return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
        }
    }
}
exports.JwtTokenSigner = JwtTokenSigner;
//# sourceMappingURL=JwtTokenSigner.js.map