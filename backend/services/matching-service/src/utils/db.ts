import { Pool, QueryResult, QueryResultRow } from 'pg';
import { logger } from './logger';

// A single, shared pool for the entire application
// Use DATABASE_URL if available, otherwise fall back to individual env vars
const dbConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,                        // Reduced for Neon.tech serverless
    idleTimeoutMillis: 30000,       // 30s - Neon.tech recommended
    connectionTimeoutMillis: 10000, // 10s - Better for cold starts
    statement_timeout: 30000,       // 30s query timeout
} : {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'contractor_worker_platform',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    statement_timeout: 30000,
};

const poolInstance = new Pool(dbConfig);

poolInstance.on('error', (err, client) => {
    logger.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Wrapper pool with query timing
export const pool = Object.assign(poolInstance, {
    query: async <T extends QueryResultRow = any>(
        text: string,
        params?: any[]
    ): Promise<QueryResult<T>> => {
        const start = Date.now();
        try {
            const result = await poolInstance.query<T>(text, params);
            const duration = Date.now() - start;

            // Log slow queries (>100ms)
            if (duration > 100) {
                console.warn(`[MATCHING-DB SLOW] ${duration}ms: ${text.substring(0, 80)}...`);
            }

            return result;
        } catch (error) {
            const duration = Date.now() - start;
            console.error(`[MATCHING-DB ERROR] ${duration}ms: ${text.substring(0, 80)}...`, error);
            throw error;
        }
    }
});

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
