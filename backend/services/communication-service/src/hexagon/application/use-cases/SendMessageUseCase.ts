import { v4 as uuid } from 'uuid';
import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort } from '../ports/outbound/MessageRepositoryPort';

export interface SendMessageCommand {
    fromUserId: string;
    toUserId: string;
    body: string;
    senderName?: string; // Optional sender name from frontend/auth context
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

        // Send push notification to recipient with sender info
        try {
            const notificationServiceUrl = process.env.NOTIFICATION_SERVICE_URL ||
                'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

            const userServiceUrl = process.env.USER_SERVICE_URL ||
                'https://user-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

            console.log(`[SendMessage] Attempting to send push notification to user ${cmd.toUserId}`);
            console.log(`[SendMessage] Notification service URL: ${notificationServiceUrl}`);
            console.log(`[SendMessage] Sender name from command: ${cmd.senderName || 'NOT PROVIDED'}`);

            // Try to get sender name from command, then fallback to fetching from user service
            let senderName = cmd.senderName || 'Someone';
            let senderProfilePic = undefined;

            // Only fetch from user service if senderName wasn't provided
            if (!cmd.senderName) {
                try {
                    // Use internal service token or make unauthenticated call with service header
                    const headers: any = {
                        'Content-Type': 'application/json'
                    };

                    // Add service-to-service authentication if available
                    const internalToken = process.env.INTERNAL_SERVICE_TOKEN || process.env.JWT_SECRET;
                    if (internalToken) {
                        // Create a simple service token or use existing token
                        headers['X-Service-Token'] = internalToken;
                    }

                    const userResponse = await fetch(`${userServiceUrl}/api/users/${cmd.fromUserId}`, {
                        headers
                    });

                    if (userResponse.ok) {
                        const userData: any = await userResponse.json();
                        console.log(`[SendMessage] User service response:`, JSON.stringify(userData).substring(0, 200));
                        senderName = userData.data?.name || userData.data?.email?.split('@')[0] || 'Someone';
                        senderProfilePic = userData.data?.profilePictureUrl;
                        console.log(`[SendMessage] Fetched sender name: ${senderName}`);
                    } else {
                        console.warn(`[SendMessage] User service returned ${userResponse.status}`);
                    }
                } catch (err) {
                    console.warn(`[SendMessage] Could not fetch sender info:`, err);
                }
            } else {
                console.log(`[SendMessage] Using sender name from command: ${senderName}`);
            }

            const notificationPayload = {
                userId: cmd.toUserId,
                channel: 'push',
                template: 'custom',
                data: {
                    title: senderName, // Show sender's name as title (like WhatsApp)
                    body: cmd.body.length > 100 ? cmd.body.substring(0, 100) + '...' : cmd.body,
                    imageUrl: senderProfilePic, // Show sender's profile picture
                    customData: {
                        type: 'message',
                        messageId: message.id,
                        fromUserId: cmd.fromUserId,
                        senderName: senderName
                    }
                }
            };

            console.log(`[SendMessage] Notification payload:`, JSON.stringify(notificationPayload));

            const response = await fetch(`${notificationServiceUrl}/notifications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notificationPayload)
            });

            if (response.ok) {
                console.log(`[SendMessage] ✅ Push notification sent successfully`);
            } else {
                const errorText = await response.text();
                console.warn(`[SendMessage] ⚠️ Notification service returned ${response.status}:`, errorText);
            }
        } catch (err: any) {
            console.error('[SendMessage] ❌ Failed to send notification:', err.message);
            console.error('[SendMessage] Error details:', err);
        }

        return message;
    }
}
