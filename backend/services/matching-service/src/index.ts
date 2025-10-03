import * as dotenv from 'dotenv';
import { logger } from './utils/logger';
import { buildApp } from './app';
import { requestContextMiddleware, enableGracefulShutdown } from '../../shared';

dotenv.config();

const app = buildApp();
// Attach request context (cast to any to avoid differing Express type versions)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(requestContextMiddleware as any);
const PORT = parseInt(process.env.PORT || '3003', 10);

let server: any;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, '0.0.0.0', () => {
        logger.info(`🔍 Matching Service running on port ${PORT}`);
        logger.info(`🏥 Health check available at http://0.0.0.0:${PORT}/health`);
        logger.info(`🔧 Max matching distance: ${process.env.MAX_MATCHING_DISTANCE_KM || 50}km`);
        logger.info(`🎯 Default search radius: ${process.env.DEFAULT_SEARCH_RADIUS_KM || 25}km`);
    });
    enableGracefulShutdown(server, { logger });
} else {
    logger.info('Matching Service initialized in test mode (no listen)');
}

export default app;