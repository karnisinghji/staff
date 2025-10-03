/**
 * Background job to reset expired availability statuses
 * This should be run periodically (e.g., every 15 minutes)
 */
export declare const resetExpiredAvailability: () => Promise<void>;
/**
 * Start periodic background job to reset expired statuses
 * Runs every 15 minutes
 */
export declare const startAvailabilityExpiryJob: () => NodeJS.Timeout;
