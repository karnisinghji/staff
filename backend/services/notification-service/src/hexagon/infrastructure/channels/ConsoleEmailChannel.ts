import { Notification } from '../../domain/entities/Notification';
import { NotificationChannelPort } from '../../application/ports/outbound/NotificationChannelPort';

export class ConsoleEmailChannel implements NotificationChannelPort {
    supports(channel: string): boolean { return channel === 'email'; }
    async send(notification: Notification): Promise<void> {
        // Simulate sending
        // eslint-disable-next-line no-console
        console.log(`[EMAIL] to user=${notification.userId} template=${notification.template} data=${JSON.stringify(notification.data)}`);
    }
}
