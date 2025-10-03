import * as dotenv from 'dotenv';
import path from 'path';
import { buildApp } from './app';
import { enableGracefulShutdown, createLogger } from '../../shared';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config(); // Also try from CWD

const app = buildApp();
const port = parseInt(process.env.PORT || '3001', 10);
const logger = createLogger({ serviceName: 'auth-service' });

let server: any;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, '0.0.0.0', () => {
        logger.info(`auth-service listening on ${port}`);
        logger.info(`Health check available at http://0.0.0.0:${port}/health`);
    });
    enableGracefulShutdown(server, { logger });
}

export default app;
