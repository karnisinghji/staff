import * as admin from 'firebase-admin';
let fcmInitialized = false;

export function initializeFCM(): boolean {
    if (fcmInitialized) {
        return true;
    }

    try {
        const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

        if (!serviceAccountJson) {
            console.warn('[FCM] FIREBASE_SERVICE_ACCOUNT_JSON not set - push notifications disabled');
            return false;
        }

        const serviceAccount = JSON.parse(serviceAccountJson);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        fcmInitialized = true;
        console.log('[FCM] Firebase Admin SDK initialized successfully');
        return true;
    } catch (error) {
        console.error('[FCM] Failed to initialize Firebase Admin SDK:', error);
        return false;
    }
}

export interface PushNotificationPayload {
    title: string;
    body: string;
    data?: Record<string, string>;
    imageUrl?: string;
}

export async function sendPushNotification(
    token: string,
    payload: PushNotificationPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!fcmInitialized) {
        return { success: false, error: 'FCM not initialized' };
    }

    try {
        const message: admin.messaging.Message = {
            notification: {
                title: payload.title,
                body: payload.body,
                ...(payload.imageUrl && { imageUrl: payload.imageUrl })
            },
            data: payload.data || {},
            token,
            android: {
                priority: 'high',
                notification: {
                    sound: 'default',
                    channelId: 'default',
                    priority: 'high' as any
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1
                    }
                }
            }
        };

        const messageId = await admin.messaging().send(message);
        console.log(`[FCM] Push notification sent successfully, messageId=${messageId}`);
        return { success: true, messageId };
    } catch (error: any) {
        console.error('[FCM] Failed to send push notification:', error);
        return { success: false, error: error.message || 'Unknown error' };
    }
}

export async function sendPushToMultipleDevices(
    tokens: string[],
    payload: PushNotificationPayload
): Promise<{ successCount: number; failureCount: number; responses: any[] }> {
    if (!fcmInitialized) {
        return { successCount: 0, failureCount: tokens.length, responses: [] };
    }

    if (tokens.length === 0) {
        return { successCount: 0, failureCount: 0, responses: [] };
    }

    try {
        const message: admin.messaging.MulticastMessage = {
            notification: {
                title: payload.title,
                body: payload.body,
                ...(payload.imageUrl && { imageUrl: payload.imageUrl })
            },
            data: payload.data || {},
            tokens,
            android: {
                priority: 'high',
                notification: {
                    sound: 'default',
                    channelId: 'default',
                    priority: 'high' as any
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1
                    }
                }
            }
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`[FCM] Batch notification sent: ${response.successCount}/${tokens.length} successful`);

        return {
            successCount: response.successCount,
            failureCount: response.failureCount,
            responses: response.responses
        };
    } catch (error: any) {
        console.error('[FCM] Failed to send batch notifications:', error);
        return { successCount: 0, failureCount: tokens.length, responses: [] };
    }
}
