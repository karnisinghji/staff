import { NotificationPort } from '../../application/ports/NotificationPort';
import { logger } from '../../../utils/logger';

export class InMemoryNotificationAdapter implements NotificationPort {
    sent: { to: string; token: string; expiresAt: Date }[] = [];
    async sendPasswordResetEmail(params: { to: string; token: string; expiresAt: Date }): Promise<void> {
        this.sent.push(params);
        logger.info(`(MockEmail) Sent password reset email to ${params.to} with token ${params.token} expiring ${params.expiresAt.toISOString()}`);
    }
}
