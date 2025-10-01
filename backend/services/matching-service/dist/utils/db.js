"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdownPool = exports.pool = void 0;
const pg_1 = require("pg");
const logger_1 = require("./logger");
// A single, shared pool for the entire application
exports.pool = new pg_1.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'contractor_worker_platform',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
exports.pool.on('error', (err, client) => {
    logger_1.logger.error('Unexpected error on idle client', err);
    process.exit(-1);
});
/**
 * Shuts down the shared database pool.
 * To be called on application exit or in test teardown.
 */
let poolEnded = false;
const shutdownPool = async () => {
    if (poolEnded)
        return; // idempotent safeguard for tests
    logger_1.logger.info('Shutting down database pool...');
    try {
        await exports.pool.end();
        poolEnded = true;
        logger_1.logger.info('Database pool shutdown complete.');
    }
    catch (err) {
        if (/Called end on pool more than once/i.test(err?.message || '')) {
            poolEnded = true; // suppress noisy duplicate end error
            logger_1.logger.warn('Pool already ended (suppressing duplicate end)');
            return;
        }
        logger_1.logger.error('Error shutting down database pool', err);
    }
};
exports.shutdownPool = shutdownPool;
//# sourceMappingURL=db.js.map