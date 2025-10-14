import { Pool } from 'pg';
import { logger } from '../utils/logger';

/**
 * Shared database pool for background jobs
 * Use a single pool instead of creating new ones to prevent connection leaks
 */
let jobPool: Pool | null = null;

const getJobPool = (): Pool => {
    if (!jobPool) {
        // Use DATABASE_URL if available, otherwise fall back to individual env vars
        const dbConfig = process.env.DATABASE_URL ? {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            max: 5,                         // Small pool for background jobs
            idleTimeoutMillis: 30000,       // 30s - Neon.tech recommended
            connectionTimeoutMillis: 10000, // 10s - Better for cold starts
            statement_timeout: 30000,       // 30s query timeout
        } : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
            max: 5,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
            statement_timeout: 30000,
        };
        jobPool = new Pool(dbConfig);

        // Handle pool errors
        jobPool.on('error', (err) => {
            logger.error('Unexpected error on idle database client in availability job', err);
        });
    }
    return jobPool;
};

/**
 * Background job to reset expired availability statuses
 * This should be run periodically (e.g., every 15 minutes)
 * Uses shared pool to prevent connection leaks
 */
export const resetExpiredAvailability = async (): Promise<void> => {
    const pool = getJobPool(); // Use shared pool instead of creating new one
    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 5000; // 5 seconds

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const result = await pool.query(`
                UPDATE worker_profiles 
                SET is_available = false, availability_expires_at = NULL, updated_at = CURRENT_TIMESTAMP
                WHERE is_available = true 
                AND availability_expires_at IS NOT NULL 
                AND availability_expires_at < NOW()
                RETURNING user_id
            `);

            if (result.rows.length > 0) {
                const userIds = result.rows.map((row: any) => row.user_id);
                logger.info(`Reset ${result.rows.length} expired availability statuses for users: ${userIds.join(', ')}`);
            } else {
                logger.debug('No expired availability statuses found');
            }
            return; // Success - exit retry loop
        } catch (error) {
            if (attempt < MAX_RETRIES) {
                logger.warn(`Availability expiry attempt ${attempt}/${MAX_RETRIES} failed, retrying in ${RETRY_DELAY_MS / 1000}s...`, error);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            } else {
                logger.error('Error resetting expired availability statuses (all retries exhausted):', error);
                throw error;
            }
        }
    }
};

/**
 * Start periodic background job to reset expired statuses
 * Runs every 15 minutes
 */
export const startAvailabilityExpiryJob = (): NodeJS.Timeout => {
    const INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
    const INITIAL_DELAY_MS = 30 * 1000; // 30 seconds - Wait for DB connection to warm up

    logger.info(`Starting availability expiry background job (first run in ${INITIAL_DELAY_MS / 1000}s, then every 15 minutes)`);

    // Run after initial delay to allow database connection to warm up
    setTimeout(() => {
        resetExpiredAvailability().catch(error => {
            logger.error('Initial availability expiry job failed:', error);
        });
    }, INITIAL_DELAY_MS);

    // Then run periodically
    return setInterval(() => {
        resetExpiredAvailability().catch(error => {
            logger.error('Periodic availability expiry job failed:', error);
        });
    }, INTERVAL_MS);
};