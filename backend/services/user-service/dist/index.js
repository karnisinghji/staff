"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./utils/env");
const logger_1 = require("./utils/logger");
const app_1 = require("./app");
const shared_1 = require("../../shared");
const availabilityExpiry_1 = require("./jobs/availabilityExpiry");
(0, env_1.initEnv)({ serviceName: 'user-service', required: ['JWT_SECRET', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'] });
(0, env_1.getRequired)('JWT_SECRET', 'user-service');
logger_1.logger.info('Loaded environment for user-service');
const app = (0, app_1.buildApp)();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(shared_1.requestContextMiddleware);
const PORT = process.env.PORT || 3002;
let server;
let expiryJobInterval;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => {
        logger_1.logger.info(`👥 User Service running on port ${PORT}`);
        logger_1.logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
    });
    // Start background job for availability expiry
    expiryJobInterval = (0, availabilityExpiry_1.startAvailabilityExpiryJob)();
    (0, shared_1.enableGracefulShutdown)(server, { logger: logger_1.logger });
    // Handle shutdown cleanup
    process.on('SIGTERM', () => {
        if (expiryJobInterval) {
            clearInterval(expiryJobInterval);
            logger_1.logger.info('Stopped availability expiry background job');
        }
    });
    process.on('SIGINT', () => {
        if (expiryJobInterval) {
            clearInterval(expiryJobInterval);
            logger_1.logger.info('Stopped availability expiry background job');
        }
    });
    process.on('exit', () => { (0, shared_1.stopTracing)().catch(() => undefined); });
}
else {
    logger_1.logger.info('User Service initialized in test mode (no listen)');
}
exports.default = app;
//# sourceMappingURL=index.js.map