import { PasswordResetRepositoryPort } from '../ports/PasswordResetRepository';
import { PasswordResetTokenRepositoryPort } from '../ports/PasswordResetTokenRepository';
import { NotificationPort } from '../ports/NotificationPort';
import { NotFoundError } from '../../domain/errors/DomainErrors';
import { randomBytes } from 'crypto';

export class GeneratePasswordResetUseCase {
    constructor(
        private passwordResetRepo: PasswordResetRepositoryPort, // user lookup (legacy transitional)
        private tokenRepo: PasswordResetTokenRepositoryPort,
        private notifier: NotificationPort = { sendPasswordResetEmail: async () => { /* no-op for tests */ } }
    ) { }
    async execute(email: string) {
        const user = await this.passwordResetRepo.findUserByEmail(email);
        if (!user) throw new NotFoundError('User not found');
        // Always issue a fresh single-use token (could reuse active one if desired)
        const token = randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.tokenRepo.create(user.id, token, expiresAt);
        await this.notifier.sendPasswordResetEmail({ to: email, token, expiresAt });
        // Do not expose token externally now that email sending exists
        return { userId: user.id, email, expiresAt };
    }
}
