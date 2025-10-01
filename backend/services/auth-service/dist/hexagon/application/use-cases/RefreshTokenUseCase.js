"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
class RefreshTokenUseCase {
    constructor(signer) {
        this.signer = signer;
    }
    async execute(input) {
        try {
            const decoded = this.signer.verify(input.refreshToken);
            const accessToken = this.signer.signAccessToken({ sub: decoded.sub, roles: decoded.roles }, '15m');
            return { accessToken, expiresInSeconds: 15 * 60 };
        }
        catch (e) {
            throw new Error('INVALID_REFRESH');
        }
    }
}
exports.RefreshTokenUseCase = RefreshTokenUseCase;
//# sourceMappingURL=RefreshTokenUseCase.js.map