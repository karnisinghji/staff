"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePasswordResetUseCase = void 0;
const DomainErrors_1 = require("../../domain/errors/DomainErrors");
const crypto_1 = require("crypto");
class GeneratePasswordResetUseCase {
    constructor(passwordResetRepo, // user lookup (legacy transitional)
    tokenRepo, notifier = { sendPasswordResetEmail: async () => { } }) {
        this.passwordResetRepo = passwordResetRepo;
        this.tokenRepo = tokenRepo;
        this.notifier = notifier;
    }
    async execute(email) {
        const user = await this.passwordResetRepo.findUserByEmail(email);
        if (!user)
            throw new DomainErrors_1.NotFoundError('User not found');
        // Always issue a fresh single-use token (could reuse active one if desired)
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.tokenRepo.create(user.id, token, expiresAt);
        await this.notifier.sendPasswordResetEmail({ to: email, token, expiresAt });
        // Do not expose token externally now that email sending exists
        return { userId: user.id, email, expiresAt };
    }
}
exports.GeneratePasswordResetUseCase = GeneratePasswordResetUseCase;
//# sourceMappingURL=GeneratePasswordReset.js.map