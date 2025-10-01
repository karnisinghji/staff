import * as dotenv from 'dotenv';
import path from 'path';
import { buildApp } from './app';
import { enableGracefulShutdown, createLogger } from '../../shared';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config(); // Also try from CWD

const app = buildApp();
const port = process.env.PORT || 3001;
const logger = createLogger({ serviceName: 'auth-service' });

let server: any;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
        logger.info(`auth-service listening on ${port}`);
    });
    enableGracefulShutdown(server, { logger });
}

export default app;
