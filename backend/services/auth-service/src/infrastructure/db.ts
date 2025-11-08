import { Pool, QueryResult, QueryResultRow } from 'pg';

// Database connection configuration
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

// Handle pool errors
poolInstance.on('error', (err) => {
    console.error('Unexpected error on idle database client', err);
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
                console.warn(`[AUTH-DB SLOW] ${duration}ms: ${text.substring(0, 80)}...`);
            }

            return result;
        } catch (error) {
            const duration = Date.now() - start;
            console.error(`[AUTH-DB ERROR] ${duration}ms: ${text.substring(0, 80)}...`, error);
            throw error;
        }
    }
});

/**
 * Shuts down the shared database pool.
 * Call this during application shutdown to ensure clean exit.
 */
export async function shutdownPool(): Promise<void> {
    if (!pool || pool.ending) {
        return; // Already shutdown or shutting down
    }

    const logger = console; // Use console if shared logger not available
    logger.info('Shutting down auth-service database pool...');

    try {
        await pool.end();
        logger.info('Auth-service database pool shutdown complete.');
    } catch (err) {
        if ((err as any)?.message?.includes('Pool was destroyed')) {
            return; // Already destroyed, ignore
        }
        logger.error('Error shutting down auth-service database pool', err);
        throw err;
    }
}