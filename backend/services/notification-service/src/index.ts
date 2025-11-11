import * as dotenv from 'dotenv';
import { buildApp } from './app';
import { requestContextMiddleware, enableGracefulShutdown, createLogger } from './shared';
import { initializeFCM } from './infrastructure/fcm';

dotenv.config();
const PORT = parseInt(process.env.PORT || '3005', 10);

// Initialize FCM for push notifications
const fcmReady = initializeFCM();

const app = buildApp(process.env.npm_package_version || '1.0.0');
const logger = createLogger({ serviceName: 'notification-service' });

app.use(requestContextMiddleware);

let server: any;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, '0.0.0.0', () => {
        logger.info(`🔔 Notification Service running on port ${PORT}`);
        logger.info(`🏥 Health check available at http://0.0.0.0:${PORT}/health`);
        if (fcmReady) {
            logger.info(`📱 FCM Push Notifications enabled`);
        } else {
            logger.warn(`📱 FCM Push Notifications disabled (missing FIREBASE_SERVICE_ACCOUNT_JSON)`);
        }
    });
    enableGracefulShutdown(server, { logger });
}

export default app;
