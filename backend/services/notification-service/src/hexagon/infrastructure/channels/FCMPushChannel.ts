import { Notification } from '../../domain/entities/Notification';
import { NotificationChannelPort } from '../../application/ports/outbound/NotificationChannelPort';
import { sendPushNotification } from '../../../infrastructure/fcm';
import { pool } from '../../../infrastructure/db';

export class FCMPushChannel implements NotificationChannelPort {
    private fcmEnabled: boolean;

    constructor(fcmEnabled: boolean = true) {
        this.fcmEnabled = fcmEnabled;
        console.log(`[FCMPushChannel] Initialized with FCM enabled: ${this.fcmEnabled}`);
    }

    supports(channel: string): boolean {
        const supported = (channel === 'push' || channel === 'fcm') && this.fcmEnabled;
        console.log(`[FCMPushChannel] supports('${channel}'): ${supported} (FCM enabled: ${this.fcmEnabled})`);
        return supported;
    }

    async send(notification: Notification): Promise<void> {
        const userId = notification.userId;

        // Look up device tokens for this user
        const tokensResult = await pool.query(
            'SELECT fcm_token, platform FROM device_tokens WHERE user_id = $1',
            [userId]
        );

        if (tokensResult.rows.length === 0) {
            throw new Error(`No device tokens found for user ${userId}`);
        }

        const tokens = tokensResult.rows.map(row => row.fcm_token);

        // Extract notification content from data or use defaults
        const title = notification.data.title || 'New Notification';
        const body = notification.data.body || notification.data.message || 'You have a new notification';
        const imageUrl = notification.data.imageUrl;
        const customData = notification.data.customData || {};

        console.log(`[FCM Channel] Sending to ${tokens.length} device(s) for user ${userId}`);

        // Send to all devices
        const results = await Promise.allSettled(
            tokens.map(token =>
                sendPushNotification(token, {
                    title,
                    body,
                    imageUrl,
                    data: {
                        notificationId: notification.id,
                        userId: notification.userId,
                        ...customData
                    }
                })
            )
        );

        const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
        const failureCount = results.length - successCount;

        if (successCount === 0) {
            throw new Error(`Failed to send push notification to any device (${failureCount} failures)`);
        }

        console.log(`[FCM Channel] Sent successfully to ${successCount}/${tokens.length} devices`);
    }
}
