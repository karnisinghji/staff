import { PushNotifications, PushNotificationSchema, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { API_CONFIG } from '../config/api';

export class PushNotificationService {
    private static instance: PushNotificationService;
    private fcmToken: string | null = null;
    private isInitialized = false;
    private debugInitAttempted = false;

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
            console.log('%c[Push Notifications]%c Not available on web platform', 'color: #FF9800; font-weight: bold', 'color: inherit');
            return;
        }

        if (this.isInitialized) {
            console.log('%c[Push Notifications]%c Already initialized', 'color: #FF9800; font-weight: bold', 'color: inherit');
            return;
        }

        console.log('%c[Push Notifications]%c Starting initialization for user:', 'color: #4CAF50; font-weight: bold', 'color: inherit', userId);

        try {
            // First check current permission status
            const currentPermission = await PushNotifications.checkPermissions();
            console.log('%c[Push Notifications]%c Current permission status:', 'color: #2196F3; font-weight: bold', 'color: inherit', currentPermission);

            // Request permission
            console.log('%c[Push Notifications]%c Requesting permissions...', 'color: #FF9800; font-weight: bold', 'color: inherit');
            const permission = await PushNotifications.requestPermissions();
            console.log('%c[Push Notifications]%c Permission result:', 'color: #2196F3; font-weight: bold', 'color: inherit', permission);

            if (permission.receive === 'granted') {
                console.log('%c[Push Notifications]%c Permission granted', 'color: #4CAF50; font-weight: bold', 'color: inherit');
                await this.registerNotifications(userId, authToken);
            } else {
                console.warn('%c[Push Notifications]%c Permission denied:', 'color: #F44336; font-weight: bold', 'color: inherit', permission);
                console.warn('%c[Push Notifications]%c To enable: Go to Settings → Apps → ComeOnDost → Notifications', 'color: #F44336; font-weight: bold', 'color: inherit');
            }
        } catch (error) {
            console.error('%c[Push Notifications]%c Initialization error:', 'color: #F44336; font-weight: bold', 'color: inherit', error);
        }
    }

    private async registerNotifications(userId: string, authToken: string): Promise<void> {
        console.log('%c[Push Notifications]%c Registering for push notifications...', 'color: #4CAF50; font-weight: bold', 'color: inherit');

        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
        console.log('%c[Push Notifications]%c Registration call completed, waiting for token...', 'color: #4CAF50; font-weight: bold', 'color: inherit');

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration', async (token: Token) => {
            console.log('%c[Push Notifications]%c ✅ FCM Token received:', 'color: #2196F3; font-weight: bold', 'color: inherit', token.value);
            this.fcmToken = token.value;

            // Send token to backend
            console.log('%c[Push Notifications]%c Sending token to backend...', 'color: #FF9800; font-weight: bold', 'color: inherit');
            try {
                await this.sendTokenToBackend(userId, token.value, authToken);
                console.log('%c[Push Notifications]%c ✅ Token successfully registered with backend', 'color: #4CAF50; font-weight: bold', 'color: inherit');

                // Show success toast for debugging
                if (Capacitor.isNativePlatform()) {
                    // Only show in dev mode or for debugging
                    console.log('%c[Push Notifications]%c 📱 Device is ready to receive notifications!', 'color: #4CAF50; font-weight: bold', 'color: inherit');
                }
            } catch (error) {
                console.error('%c[Push Notifications]%c ❌ Failed to send token to backend:', 'color: #F44336; font-weight: bold', 'color: inherit', error);
            }
        });

        // Some issue with registration
        PushNotifications.addListener('registrationError', (error: any) => {
            console.error('%c[Push Notifications]%c ❌ Registration error:', 'color: #F44336; font-weight: bold', 'color: inherit', error);
            console.error('%c[Push Notifications]%c Check:', 'color: #F44336; font-weight: bold', 'color: inherit', '1) google-services.json exists, 2) Permissions granted, 3) Network connection');
        });

        // Show notification when app is in foreground
        PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                console.log('%c[Push Notifications]%c Received:', 'color: #FF9800; font-weight: bold', 'color: inherit', notification);

                // Show custom in-app notification or update UI
                this.handleForegroundNotification(notification);
            }
        );

        // User tapped on notification
        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                console.log('%c[Push Notifications]%c Action performed:', 'color: #9C27B0; font-weight: bold', 'color: inherit', notification);

                // Navigate to relevant screen based on notification data
                this.handleNotificationAction(notification);
            }
        );

        this.isInitialized = true;
    }

    /**
     * Debug helper: register for push and log token without backend calls.
     * Safe to run in production; does not send token anywhere.
     */
    async debugRegisterAndLog(): Promise<void> {
        if (this.debugInitAttempted) return;
        this.debugInitAttempted = true;
        try {
            if (!Capacitor.isNativePlatform()) {
                console.log('[PushDebug] Not a native platform');
                return;
            }
            await PushNotifications.register();
            PushNotifications.addListener('registration', (token: Token) => {
                console.log('[PushDebug] FCM_TOKEN:', token.value);
                this.fcmToken = token.value;
                // Token logged to console - no UI notification needed
            });
            PushNotifications.addListener('registrationError', (error: any) => {
                console.warn('[PushDebug] registrationError:', error);
            });
        } catch (e) {
            console.warn('[PushDebug] Failed to debug-register for push:', e);
        }
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
            console.log('[Push Notifications] Sending token to backend for user:', userId);
            console.log('[Push Notifications] Token (first 20 chars):', fcmToken.substring(0, 20));

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
                console.log('[Push Notifications] ✅ Token registered with backend successfully');
            } else {
                const errorText = await response.text();
                console.error('[Push Notifications] ❌ Failed to register token:', response.status, errorText);
            }
        } catch (error) {
            console.error('[Push Notifications] ❌ Error sending token to backend:', error);
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
     * Check if FCM token is registered on backend
     */
    async checkTokenRegistration(userId: string, authToken: string): Promise<boolean> {
        if (!Capacitor.isNativePlatform()) {
            return false;
        }

        try {
            const response = await fetch(
                `${API_CONFIG.NOTIFICATION_SERVICE}/api/notifications/token/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log('%c[Push Notifications]%c Backend token check:', 'color: #2196F3; font-weight: bold', 'color: inherit', data.token ? 'EXISTS' : 'MISSING');
                return !!data.token;
            }

            return false;
        } catch (error) {
            console.error('%c[Push Notifications]%c Failed to check token registration:', 'color: #F44336; font-weight: bold', 'color: inherit', error);
            return false;
        }
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
