"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.shutdownPool = shutdownPool;
const pg_1 = require("pg");
// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'contractor_worker_platform',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};
exports.pool = new pg_1.Pool(dbConfig);
// Handle pool errors
exports.pool.on('error', (err) => {
    console.error('Unexpected error on idle database client', err);
});
/**
 * Shuts down the shared database pool.
 * Call this during application shutdown to ensure clean exit.
 */
async function shutdownPool() {
    if (!exports.pool || exports.pool.ending) {
        return; // Already shutdown or shutting down
    }
    const logger = console; // Use console if shared logger not available
    logger.info('Shutting down auth-service database pool...');
    try {
        await exports.pool.end();
        logger.info('Auth-service database pool shutdown complete.');
    }
    catch (err) {
        if (err?.message?.includes('Pool was destroyed')) {
            return; // Already destroyed, ignore
        }
        logger.error('Error shutting down auth-service database pool', err);
        throw err;
    }
}
//# sourceMappingURL=db.js.map