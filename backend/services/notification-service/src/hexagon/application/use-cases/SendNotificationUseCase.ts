import { v4 as uuid } from 'uuid';
import { Notification } from '../../domain/entities/Notification';
import { NotificationChannelPort } from '../ports/outbound/NotificationChannelPort';

export interface SendNotificationCommand {
    userId: string;
    channel: string;
    template: string;
    data: Record<string, any>;
}

export class SendNotificationUseCase {
    constructor(private readonly channels: NotificationChannelPort[]) { }
    async execute(cmd: SendNotificationCommand): Promise<Notification> {
        const notification: Notification = {
            id: uuid(),
            userId: cmd.userId,
            channel: cmd.channel as any,
            template: cmd.template,
            data: cmd.data || {},
            createdAt: new Date(),
            sentAt: null,
            status: 'pending'
        };
        const channel = this.channels.find(c => c.supports(cmd.channel));
        if (!channel) {
            notification.status = 'failed';
            notification.error = 'Unsupported channel';
            return notification;
        }
        try {
            await channel.send(notification);
            notification.status = 'sent';
            notification.sentAt = new Date();
        } catch (e: any) {
            notification.status = 'failed';
            notification.error = e.message || 'Unknown error';
        }
        return notification;
    }
}
