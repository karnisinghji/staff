export type NotificationChannel = 'email' | 'sms' | 'push' | 'inapp';
export interface Notification {
    id: string;
    userId: string;
    channel: NotificationChannel;
    template: string;
    data: Record<string, any>;
    createdAt: Date;
    sentAt?: Date | null;
    status: 'pending' | 'sent' | 'failed';
    error?: string;
}
