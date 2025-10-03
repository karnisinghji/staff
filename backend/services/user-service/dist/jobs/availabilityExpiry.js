"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAvailabilityExpiryJob = exports.resetExpiredAvailability = void 0;
const pg_1 = require("pg");
const logger_1 = require("../utils/logger");
/**
 * Create database pool for background jobs
 */
const createPool = () => {
    return new pg_1.Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'contractor_worker_platform',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    });
};
/**
 * Background job to reset expired availability statuses
 * This should be run periodically (e.g., every 15 minutes)
 */
const resetExpiredAvailability = async () => {
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
            const userIds = result.rows.map((row) => row.user_id);
            logger_1.logger.info(`Reset ${result.rows.length} expired availability statuses for users: ${userIds.join(', ')}`);
        }
        else {
            logger_1.logger.debug('No expired availability statuses found');
        }
    }
    catch (error) {
        logger_1.logger.error('Error resetting expired availability statuses:', error);
        throw error;
    }
};
exports.resetExpiredAvailability = resetExpiredAvailability;
/**
 * Start periodic background job to reset expired statuses
 * Runs every 15 minutes
 */
const startAvailabilityExpiryJob = () => {
    const INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
    logger_1.logger.info('Starting availability expiry background job (runs every 15 minutes)');
    // Run immediately once
    (0, exports.resetExpiredAvailability)().catch(error => {
        logger_1.logger.error('Initial availability expiry job failed:', error);
    });
    // Then run periodically
    return setInterval(() => {
        (0, exports.resetExpiredAvailability)().catch(error => {
            logger_1.logger.error('Periodic availability expiry job failed:', error);
        });
    }, INTERVAL_MS);
};
exports.startAvailabilityExpiryJob = startAvailabilityExpiryJob;
//# sourceMappingURL=availabilityExpiry.js.map