import { Pool, QueryResult, QueryResultRow } from 'pg';
import { logger } from './logger';

// A single, shared pool for the entire application
// Use DATABASE_URL if available, otherwise fall back to individual env vars
const dbConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,                        // Increased pool size for better concurrency
    min: 2,                         // Keep 2 connections warm
    idleTimeoutMillis: 10000,       // 10s - Close idle connections faster
    connectionTimeoutMillis: 3000,  // 3s - Fail fast if can't connect
    statement_timeout: 5000,        // 5s - Kill slow queries faster
} : {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'contractor_worker_platform',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    max: 20,
    min: 2,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 3000,
    statement_timeout: 5000,
};

const poolInstance = new Pool(dbConfig);

poolInstance.on('error', (err, client) => {
    logger.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Export pool directly without wrapper to avoid circular reference issues
export const pool = poolInstance;

// Note: Query timing temporarily disabled due to potential circular reference
// To re-enable, use a proxy or intercept pattern instead of Object.assign

/**
 * Shuts down the shared database pool.
 * To be called on application exit or in test teardown.
 */
let poolEnded = false;
export const shutdownPool = async (): Promise<void> => {
    if (poolEnded) return; // idempotent safeguard for tests
    logger.info('Shutting down database pool...');
    try {
        await pool.end();
        poolEnded = true;
        logger.info('Database pool shutdown complete.');
    } catch (err: any) {
        if (/Called end on pool more than once/i.test(err?.message || '')) {
            poolEnded = true; // suppress noisy duplicate end error
            logger.warn('Pool already ended (suppressing duplicate end)');
            return;
        }
        logger.error('Error shutting down database pool', err);
    }
};
