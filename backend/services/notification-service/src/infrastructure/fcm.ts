import * as admin from 'firebase-admin';
let fcmInitialized = false;

export function initializeFCM(): boolean {
    if (fcmInitialized) return true;

    const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const rawB64 = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_B64;

    if (!rawJson && !rawB64) {
        console.warn('[FCM] No FIREBASE_SERVICE_ACCOUNT_JSON(_B64) env vars found - push notifications disabled');
        return false;
    }

    let parsed: any = null;
    try {
        if (rawJson) {
            console.log(`[FCM] Found JSON env (length=${rawJson.length}) attempting parse...`);
            parsed = JSON.parse(rawJson);
        } else if (rawB64) {
            console.log(`[FCM] Found Base64 env (length=${rawB64.length}) attempting decode & parse...`);
            const decoded = Buffer.from(rawB64, 'base64').toString('utf-8');
            parsed = JSON.parse(decoded);
        }
    } catch (e: any) {
        console.error('[FCM] Failed parsing Firebase service account JSON:', e?.message);
        return false;
    }

    if (!parsed) {
        console.error('[FCM] Service account content empty after parsing');
        return false;
    }

    try {
        admin.initializeApp({ credential: admin.credential.cert(parsed) });
        fcmInitialized = true;
        console.log('[FCM] Firebase Admin SDK initialized successfully');
        return true;
    } catch (e: any) {
        console.error('[FCM] Failed to initialize Firebase Admin SDK:', e?.message);
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
                    channelId: 'messages', // Use 'messages' channel for message notifications
                    priority: 'high' as any,
                    defaultSound: true,
                    defaultVibrateTimings: true,
                    defaultLightSettings: true,
                    // Set notification color (your app's primary color)
                    color: '#1E40AF', // Blue color
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                        alert: {
                            title: payload.title,
                            body: payload.body
                        },
                        'mutable-content': 1, // Allow notification modifications
                        category: 'MESSAGE' // For custom actions
                    }
                },
                fcmOptions: {
                    ...(payload.imageUrl && { imageUrl: payload.imageUrl })
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
                    channelId: 'messages',
                    priority: 'high' as any,
                    defaultSound: true,
                    defaultVibrateTimings: true,
                    defaultLightSettings: true,
                    color: '#1E40AF',
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                        alert: {
                            title: payload.title,
                            body: payload.body
                        },
                        'mutable-content': 1,
                        category: 'MESSAGE'
                    }
                },
                fcmOptions: {
                    ...(payload.imageUrl && { imageUrl: payload.imageUrl })
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
