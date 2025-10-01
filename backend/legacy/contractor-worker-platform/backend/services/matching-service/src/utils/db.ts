import { Pool } from 'pg';
import { logger } from './logger';

// A single, shared pool for the entire application
export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'contractor_worker_platform',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
    logger.error('Unexpected error on idle client', err);
    process.exit(-1);
});

/**
 * Shuts down the shared database pool.
 * To be called on application exit or in test teardown.
 */
export const shutdownPool = async (): Promise<void> => {
    logger.info('Shutting down database pool...');
    try {
        await pool.end();
        logger.info('Database pool shutdown complete.');
    } catch (err) {
        logger.error('Error shutting down database pool', err);
    }
};
