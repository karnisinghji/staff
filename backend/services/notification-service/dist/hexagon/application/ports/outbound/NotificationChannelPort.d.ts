import { Notification } from '../../../domain/entities/Notification';
export interface NotificationChannelPort {
    supports(channel: string): boolean;
    send(notification: Notification): Promise<void>;
}
