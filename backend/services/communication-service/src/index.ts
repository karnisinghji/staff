import * as dotenv from 'dotenv';
import { buildApp } from './app';
import { requestContextMiddleware, enableGracefulShutdown, createLogger } from '../../shared';

dotenv.config();
const PORT = parseInt(process.env.PORT || '3004', 10);
const app = buildApp(process.env.npm_package_version || '1.0.0');
const logger = createLogger({ serviceName: 'communication-service' });

// Attach request context early
app.use(requestContextMiddleware);

let server: any;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, '0.0.0.0', () => {
        logger.info(`📞 Communication Service running on port ${PORT}`);
        logger.info(`🏥 Health check available at http://0.0.0.0:${PORT}/health`);
    });
    enableGracefulShutdown(server, { logger });
}

export default app;
