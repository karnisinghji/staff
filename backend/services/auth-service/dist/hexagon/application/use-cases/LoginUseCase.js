"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
class LoginUseCase {
    constructor(repo, hasher, signer) {
        this.repo = repo;
        this.hasher = hasher;
        this.signer = signer;
    }
    async execute(input) {
        const cred = await this.repo.findByEmail(input.email.toLowerCase());
        if (!cred)
            throw new Error('INVALID_CREDENTIALS');
        const ok = await this.hasher.compare(input.password, cred.passwordHash);
        if (!ok)
            throw new Error('INVALID_CREDENTIALS');
        const accessToken = this.signer.signAccessToken({ sub: cred.id, roles: cred.roles }, '15m');
        const refreshToken = this.signer.signRefreshToken({ sub: cred.id }, '7d');
        return { accessToken, refreshToken, expiresInSeconds: 15 * 60, user: { id: cred.id, email: cred.email, roles: cred.roles } };
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map