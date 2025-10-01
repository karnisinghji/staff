import { NotificationPort } from '../../application/ports/NotificationPort';
export declare class InMemoryNotificationAdapter implements NotificationPort {
    sent: {
        to: string;
        token: string;
        expiresAt: Date;
    }[];
    sendPasswordResetEmail(params: {
        to: string;
        token: string;
        expiresAt: Date;
    }): Promise<void>;
}
