import { initEnv, getRequired } from './utils/env';
import { logger } from './utils/logger';
import { buildApp } from './app';
import { requestContextMiddleware, enableGracefulShutdown, stopTracing } from '../../shared';
import { startAvailabilityExpiryJob } from './jobs/availabilityExpiry';

initEnv({ serviceName: 'user-service', required: ['JWT_SECRET', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'] });
getRequired('JWT_SECRET', 'user-service');
logger.info('Loaded environment for user-service');

const app = buildApp();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(requestContextMiddleware as any);
const PORT = process.env.PORT || 3002;

let server: any;
let expiryJobInterval: NodeJS.Timeout;

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => {
        logger.info(`👥 User Service running on port ${PORT}`);
        logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
    });

    // Start background job for availability expiry
    expiryJobInterval = startAvailabilityExpiryJob();

    enableGracefulShutdown(server, { logger });

    // Handle shutdown cleanup
    process.on('SIGTERM', () => {
        if (expiryJobInterval) {
            clearInterval(expiryJobInterval);
            logger.info('Stopped availability expiry background job');
        }
    });

    process.on('SIGINT', () => {
        if (expiryJobInterval) {
            clearInterval(expiryJobInterval);
            logger.info('Stopped availability expiry background job');
        }
    });
    process.on('exit', () => { stopTracing().catch(() => undefined); });
} else {
    logger.info('User Service initialized in test mode (no listen)');
}

export default app;