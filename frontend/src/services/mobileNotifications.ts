import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { API_CONFIG } from '../config/api';

export class MobileNotificationService {
    private static pollingInterval: NodeJS.Timeout | null = null;
    private static lastMessageTimestamp: number = Date.now();
    private static isInitialized = false;

    static async initialize(token: string) {
        // Only initialize on native platforms
        if (!Capacitor.isNativePlatform()) {
            console.log('Not a native platform, skipping mobile notifications');
            return;
        }

        if (this.isInitialized) {
            console.log('Mobile notifications already initialized');
            return;
        }

        try {
            // Request notification permissions
            const permission = await LocalNotifications.requestPermissions();

            if (permission.display === 'granted') {
                console.log('Notification permission granted');
                this.isInitialized = true;

                // Start polling for new messages
                this.startPolling(token);
            } else {
                console.log('Notification permission denied');
            }
        } catch (error) {
            console.error('Error initializing mobile notifications:', error);
        }
    }

    static startPolling(token: string) {
        // Poll every 30 seconds for new messages
        this.pollingInterval = setInterval(async () => {
            await this.checkForNewMessages(token);
        }, 30000);

        // Also check immediately
        this.checkForNewMessages(token);
    }

    static stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
        this.isInitialized = false;
    }

    private static async checkForNewMessages(_token: string) {
        try {
            // NOTE: This endpoint doesn't exist yet on communication-service
            // The MessageContext already handles message polling via /messages endpoint
            // TODO: Implement /api/messages/recent endpoint or integrate with MessageContext
            console.log('Mobile notification polling disabled - using MessageContext for message updates');
            return;

            /* DISABLED UNTIL ENDPOINT IS IMPLEMENTED
            // Fetch recent messages
            const response = await fetch(`${API_CONFIG.COMMUNICATION_SERVICE}/api/messages/recent?since=${this.lastMessageTimestamp}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) return;

            const messages = await response.json();

            // Show notification for each new message
            if (messages && messages.length > 0) {
                for (const message of messages) {
                    await this.showNotification(message);
                }

                // Update last timestamp
                this.lastMessageTimestamp = Date.now();
            }
            */
        } catch (error) {
            console.error('Error checking for new messages:', error);
        }
    }

    static async showNotification(message: any) {
        try {
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: message.senderName || 'New Message',
                        body: message.content || 'You have a new message',
                        id: parseInt(message.id) || Math.floor(Math.random() * 100000),
                        schedule: { at: new Date(Date.now() + 100) }, // Show immediately
                        sound: 'default',
                        smallIcon: 'ic_stat_icon_config_sample',
                        iconColor: '#25D366',
                        extra: {
                            messageId: message.id,
                            senderId: message.senderId,
                        }
                    }
                ]
            });
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }

    static async showTeamRequestNotification(request: any) {
        try {
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: 'New Team Request',
                        body: `${request.senderName} wants to join your team`,
                        id: parseInt(request.id) || Math.floor(Math.random() * 100000),
                        schedule: { at: new Date(Date.now() + 100) },
                        sound: 'default',
                        smallIcon: 'ic_stat_icon_config_sample',
                        iconColor: '#25D366',
                        extra: {
                            requestId: request.id,
                            senderId: request.senderId,
                            type: 'team_request'
                        }
                    }
                ]
            });
        } catch (error) {
            console.error('Error showing team request notification:', error);
        }
    }

    static async checkForTeamRequests(token: string) {
        try {
            const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/pending`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) return;

            const requests = await response.json();

            if (requests && requests.length > 0) {
                for (const request of requests) {
                    // Only show notification if it's new (within last 5 minutes)
                    const requestTime = new Date(request.createdAt).getTime();
                    const now = Date.now();

                    if (now - requestTime < 5 * 60 * 1000) { // 5 minutes
                        await this.showTeamRequestNotification(request);
                    }
                }
            }
        } catch (error) {
            console.error('Error checking for team requests:', error);
        }
    }
}
