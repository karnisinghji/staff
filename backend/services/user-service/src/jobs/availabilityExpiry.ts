import { Pool } from 'pg';
import { logger } from '../utils/logger';

/**
 * Create database pool for background jobs
 */
const createPool = (): Pool => {
    // Use DATABASE_URL if available, otherwise fall back to individual env vars
    const dbConfig = process.env.DATABASE_URL ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    } : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'contractor_worker_platform',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    };
    return new Pool(dbConfig);
};

/**
 * Background job to reset expired availability statuses
 * This should be run periodically (e.g., every 15 minutes)
 */
export const resetExpiredAvailability = async (): Promise<void> => {
    const pool = createPool();

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
    } catch (error) {
        logger.error('Error resetting expired availability statuses:', error);
        throw error;
    }
};

/**
 * Start periodic background job to reset expired statuses
 * Runs every 15 minutes
 */
export const startAvailabilityExpiryJob = (): NodeJS.Timeout => {
    const INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

    logger.info('Starting availability expiry background job (runs every 15 minutes)');

    // Run immediately once
    resetExpiredAvailability().catch(error => {
        logger.error('Initial availability expiry job failed:', error);
    });

    // Then run periodically
    return setInterval(() => {
        resetExpiredAvailability().catch(error => {
            logger.error('Periodic availability expiry job failed:', error);
        });
    }, INTERVAL_MS);
};