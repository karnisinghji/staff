import { v4 as uuid } from 'uuid';
import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort } from '../ports/outbound/MessageRepositoryPort';

export interface SendMessageCommand {
    fromUserId: string;
    toUserId: string;
    body: string;
}

export class SendMessageUseCase {
    constructor(private readonly repo: MessageRepositoryPort) { }
    async execute(cmd: SendMessageCommand): Promise<Message> {
        const message: Message = {
            id: uuid(),
            fromUserId: cmd.fromUserId,
            toUserId: cmd.toUserId,
            body: cmd.body,
            createdAt: new Date(),
            readAt: null
        };
        await this.repo.save(message);

        // Send push notification to recipient
        try {
            const notificationServiceUrl = process.env.NOTIFICATION_SERVICE_URL ||
                'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

            await fetch(`${notificationServiceUrl}/notifications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: cmd.toUserId,
                    channel: 'push',
                    template: 'custom',
                    data: {
                        title: 'New Message',
                        body: cmd.body.length > 100 ? cmd.body.substring(0, 100) + '...' : cmd.body,
                        customData: {
                            type: 'message',
                            messageId: message.id,
                            fromUserId: cmd.fromUserId
                        }
                    }
                })
            }).catch(err => {
                console.warn('[SendMessage] Failed to send notification:', err.message);
            });
        } catch (err) {
            console.warn('[SendMessage] Notification service unavailable:', err);
        }

        return message;
    }
}
