export interface NotificationPort {
    sendPasswordResetEmail(params: { to: string; token: string; expiresAt: Date }): Promise<void>;
}
