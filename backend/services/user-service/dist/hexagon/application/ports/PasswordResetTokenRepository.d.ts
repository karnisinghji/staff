export interface PasswordResetTokenRecord {
    userId: string;
    token: string;
    expiresAt: Date;
    consumedAt: Date | null;
}
export interface PasswordResetTokenRepositoryPort {
    create(userId: string, token: string, expiresAt: Date): Promise<void>;
    findActiveByUser(userId: string, now: Date): Promise<PasswordResetTokenRecord | null>;
    findByToken(token: string): Promise<PasswordResetTokenRecord | null>;
    markConsumed(token: string, at: Date): Promise<void>;
    purgeExpired?(now: Date): Promise<number>;
}
