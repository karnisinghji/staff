import { Notification } from '../../domain/entities/Notification';
import { NotificationChannelPort } from '../../application/ports/outbound/NotificationChannelPort';
export declare class ConsoleEmailChannel implements NotificationChannelPort {
    supports(channel: string): boolean;
    send(notification: Notification): Promise<void>;
}
