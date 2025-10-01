export interface PasswordResetRepositoryPort {
    generateToken(userId: string): Promise<{
        token: string;
        expiresAt: Date;
    }>;
    findUserByEmail(email: string): Promise<{
        id: string;
        email: string;
    } | null>;
}
