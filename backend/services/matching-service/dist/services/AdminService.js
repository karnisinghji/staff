"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = exports.AdminService = void 0;
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const matching_1 = require("../utils/matching");
class AdminService {
    constructor() {
        this.cache = null;
        this.listenClient = null;
        const ttl = parseInt(process.env.ADMIN_CACHE_TTL_SEC || '60', 10);
        this.ttlMs = Math.max(0, ttl) * 1000;
        // Start listening for cross-instance invalidation notifications unless disabled
        if (process.env.ENABLE_ADMIN_PG_NOTIFICATIONS !== 'false') {
            // fire-and-forget listener startup
            this.startListener();
        }
    }
    async startListener() {
        try {
            this.listenClient = await db_1.pool.connect();
            this.listenClient.on('notification', (msg) => {
                try {
                    if (msg && msg.channel === 'admin_cache_invalidate') {
                        logger_1.logger.info('Received admin_cache_invalidate notification, clearing cache');
                        this.clearCache();
                    }
                }
                catch (e) {
                    logger_1.logger.error('Error handling admin notification', e);
                }
            });
            await this.listenClient.query('LISTEN admin_cache_invalidate');
            logger_1.logger.info('AdminService listening for admin_cache_invalidate notifications');
        }
        catch (err) {
            logger_1.logger.error('Failed to start admin notification listener', err);
            // leave listenClient null; service continues to function without notifications
            this.listenClient = null;
        }
    }
    /**
     * Shutdown the listener client if present. Does not end the shared pool.
     */
    async shutdown() {
        try {
            if (this.listenClient) {
                try {
                    await this.listenClient.query('UNLISTEN admin_cache_invalidate');
                }
                catch (e) {
                    // ignore
                }
                try {
                    this.listenClient.release();
                }
                catch (e) {
                    // ignore
                }
                this.listenClient = null;
                logger_1.logger.info('AdminService listener shutdown complete');
            }
        }
        catch (err) {
            logger_1.logger.warn('Error shutting down AdminService listener', err);
        }
    }
    /**
     * Clear in-memory cache (useful for tests / immediate invalidation)
     */
    clearCache() {
        this.cache = null;
    }
    async getDefaultWeights() {
        // Return cached value when available and fresh
        if (this.cache) {
            const age = Date.now() - this.cache.fetchedAt;
            if (this.ttlMs === 0 || age <= this.ttlMs) {
                logger_1.logger.info('AdminService cache hit for default weights');
                return this.cache.weights;
            }
            logger_1.logger.info('AdminService cache stale for default weights; refreshing');
            // stale -> fall through to refresh
        }
        try {
            const res = await db_1.pool.query('SELECT value FROM admin_settings WHERE key = $1', ['matching_default_weights']);
            if (res.rows && res.rows[0] && res.rows[0].value) {
                const merged = { ...matching_1.defaultWeights, ...res.rows[0].value };
                this.cache = { weights: merged, fetchedAt: Date.now() };
                logger_1.logger.info('AdminService cache updated for default weights');
                return merged;
            }
            this.cache = { weights: matching_1.defaultWeights, fetchedAt: Date.now() };
            logger_1.logger.info('AdminService cache set to defaults for default weights');
            return matching_1.defaultWeights;
        }
        catch (err) {
            logger_1.logger.error('Error fetching default weights, falling back to in-memory defaults', err);
            // If cache exists return it even if stale; otherwise fallback to defaults
            if (this.cache) {
                logger_1.logger.warn('AdminService returning stale cached weights due to DB error');
                return this.cache.weights;
            }
            return matching_1.defaultWeights;
        }
    }
    async updateDefaultWeights(weights) {
        try {
            const res = await db_1.pool.query(`INSERT INTO admin_settings (key, value) VALUES ($1, $2)
                 ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
                 RETURNING value`, ['matching_default_weights', weights]);
            const merged = { ...matching_1.defaultWeights, ...res.rows[0].value };
            // Update cache immediately to reflect new settings
            this.cache = { weights: merged, fetchedAt: Date.now() };
            try {
                // broadcast invalidation so other instances can clear/refresh their caches
                await db_1.pool.query("NOTIFY admin_cache_invalidate, 'updated';");
            }
            catch (e) {
                // non-fatal
                logger_1.logger.warn('Failed to send admin_cache_invalidate notification', e);
            }
            return merged;
        }
        catch (err) {
            logger_1.logger.error('Error updating default weights', err);
            throw err;
        }
    }
}
exports.AdminService = AdminService;
exports.adminService = new AdminService();
//# sourceMappingURL=AdminService.js.map