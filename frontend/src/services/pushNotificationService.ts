import { PushNotifications, PushNotificationSchema, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { API_CONFIG } from '../config/api';

export class PushNotificationService {
    private static instance: PushNotificationService;
    private fcmToken: string | null = null;
    private isInitialized = false;

    private constructor() { }

    static getInstance(): PushNotificationService {
        if (!PushNotificationService.instance) {
            PushNotificationService.instance = new PushNotificationService();
        }
        return PushNotificationService.instance;
    }

    /**
     * Initialize push notifications
     * Must be called after user login
     */
    async initialize(userId: string, authToken: string): Promise<void> {
        if (!Capacitor.isNativePlatform()) {
            console.log('[Push Notifications] Not available on web platform');
            return;
        }

        if (this.isInitialized) {
            console.log('[Push Notifications] Already initialized');
            return;
        }

        try {
            // Request permission
            const permission = await PushNotifications.requestPermissions();

            if (permission.receive === 'granted') {
                console.log('[Push Notifications] Permission granted');
                await this.registerNotifications(userId, authToken);
            } else {
                console.warn('[Push Notifications] Permission denied');
            }
        } catch (error) {
            console.error('[Push Notifications] Initialization error:', error);
        }
    }

    private async registerNotifications(userId: string, authToken: string): Promise<void> {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration', async (token: Token) => {
            console.log('[Push Notifications] FCM Token:', token.value);
            this.fcmToken = token.value;

            // Send token to backend
            await this.sendTokenToBackend(userId, token.value, authToken);
        });

        // Some issue with registration
        PushNotifications.addListener('registrationError', (error: any) => {
            console.error('[Push Notifications] Registration error:', error);
        });

        // Show notification when app is in foreground
        PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                console.log('[Push Notifications] Received:', notification);

                // Show custom in-app notification or update UI
                this.handleForegroundNotification(notification);
            }
        );

        // User tapped on notification
        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                console.log('[Push Notifications] Action performed:', notification);

                // Navigate to relevant screen based on notification data
                this.handleNotificationAction(notification);
            }
        );

        this.isInitialized = true;
    }

    /**
     * Send FCM token to backend for storage
     */
    private async sendTokenToBackend(
        userId: string,
        fcmToken: string,
        authToken: string
    ): Promise<void> {
        try {
            const response = await fetch(
                `${API_CONFIG.NOTIFICATION_SERVICE}/api/notifications/register-device`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        userId,
                        fcmToken,
                        platform: 'android',
                        deviceInfo: {
                            model: Capacitor.getPlatform(),
                            os: 'android'
                        }
                    })
                }
            );

            if (response.ok) {
                console.log('[Push Notifications] Token registered with backend');
            } else {
                console.error('[Push Notifications] Failed to register token with backend');
            }
        } catch (error) {
            console.error('[Push Notifications] Error sending token to backend:', error);
        }
    }

    /**
     * Handle notification received while app is in foreground
     */
    private handleForegroundNotification(notification: PushNotificationSchema): void {
        // Dispatch custom event that UI can listen to
        const event = new CustomEvent('pushNotification', {
            detail: notification
        });
        window.dispatchEvent(event);

        // Could also show a toast or in-app notification here
        console.log('[Push Notifications] Foreground notification:', notification.title);
    }

    /**
     * Handle user tapping on notification
     */
    private handleNotificationAction(action: ActionPerformed): void {
        const notification = action.notification;
        const data = notification.data;

        // Navigate based on notification type
        if (data.type === 'message') {
            // Navigate to messages tab
            window.location.hash = '#/my-team?tab=messages';
        } else if (data.type === 'team_request') {
            // Navigate to team members
            window.location.hash = '#/my-team';
        } else if (data.type === 'job_offer') {
            // Navigate to jobs
            window.location.hash = '#/search';
        }

        console.log('[Push Notifications] Navigating to:', data.type);
    }

    /**
     * Get current FCM token
     */
    getToken(): string | null {
        return this.fcmToken;
    }

    /**
     * Unregister notifications (on logout)
     */
    async unregister(): Promise<void> {
        if (!Capacitor.isNativePlatform()) {
            return;
        }

        try {
            await PushNotifications.removeAllListeners();
            this.isInitialized = false;
            this.fcmToken = null;
            console.log('[Push Notifications] Unregistered');
        } catch (error) {
            console.error('[Push Notifications] Unregister error:', error);
        }
    }
}

// Export singleton instance
export const pushNotificationService = PushNotificationService.getInstance();
