import { PasswordResetRepositoryPort } from '../ports/PasswordResetRepository';
import { PasswordResetTokenRepositoryPort } from '../ports/PasswordResetTokenRepository';
import { NotificationPort } from '../ports/NotificationPort';
export declare class GeneratePasswordResetUseCase {
    private passwordResetRepo;
    private tokenRepo;
    private notifier;
    constructor(passwordResetRepo: PasswordResetRepositoryPort, // user lookup (legacy transitional)
    tokenRepo: PasswordResetTokenRepositoryPort, notifier?: NotificationPort);
    execute(email: string): Promise<{
        userId: string;
        email: string;
        expiresAt: Date;
    }>;
}
