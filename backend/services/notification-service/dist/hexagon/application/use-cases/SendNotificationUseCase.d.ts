import { Notification } from '../../domain/entities/Notification';
import { NotificationChannelPort } from '../ports/outbound/NotificationChannelPort';
export interface SendNotificationCommand {
    userId: string;
    channel: string;
    template: string;
    data: Record<string, any>;
}
export declare class SendNotificationUseCase {
    private readonly channels;
    constructor(channels: NotificationChannelPort[]);
    execute(cmd: SendNotificationCommand): Promise<Notification>;
}
