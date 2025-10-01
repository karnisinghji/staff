/**
 * DEPRECATED BRIDGE: AdminService will be replaced by dedicated hex weight config use cases.
 * Currently still used for caching + backward persistence. Remove once all consumers migrated.
 */
import { PoolClient } from 'pg';
import { pool } from '../utils/db';
import { logger } from '../utils/logger';
import { MatchWeights } from '../types';
import { defaultWeights } from '../utils/matching';


export class AdminService {
    private cache: { weights: MatchWeights; fetchedAt: number } | null = null;
    private ttlMs: number;
    private listenClient: PoolClient | null = null;

    constructor() {
        const ttl = parseInt(process.env.ADMIN_CACHE_TTL_SEC || '60', 10);
        this.ttlMs = Math.max(0, ttl) * 1000;
        // Start listening for cross-instance invalidation notifications unless disabled
        if (process.env.ENABLE_ADMIN_PG_NOTIFICATIONS !== 'false') {
            // fire-and-forget listener startup
            this.startListener();
        }
    }

    private async startListener() {
        try {
            this.listenClient = await pool.connect();
            this.listenClient.on('notification', (msg: any) => {
                try {
                    if (msg && msg.channel === 'admin_cache_invalidate') {
                        logger.info('Received admin_cache_invalidate notification, clearing cache');
                        this.clearCache();
                    }
                } catch (e) {
                    logger.error('Error handling admin notification', e);
                }
            });
            await this.listenClient.query('LISTEN admin_cache_invalidate');
            logger.info('AdminService listening for admin_cache_invalidate notifications');
        } catch (err) {
            logger.error('Failed to start admin notification listener', err);
            // leave listenClient null; service continues to function without notifications
            this.listenClient = null;
        }
    }

    /**
     * Shutdown the listener client if present. Does not end the shared pool.
     */
    async shutdown(): Promise<void> {
        try {
            if (this.listenClient) {
                try {
                    await this.listenClient.query('UNLISTEN admin_cache_invalidate');
                } catch (e) {
                    // ignore
                }
                try {
                    this.listenClient.release();
                } catch (e) {
                    // ignore
                }
                this.listenClient = null;
                logger.info('AdminService listener shutdown complete');
            }
        } catch (err) {
            logger.warn('Error shutting down AdminService listener', err);
        }
    }

    /**
     * Clear in-memory cache (useful for tests / immediate invalidation)
     */
    clearCache() {
        this.cache = null;
    }

    async getDefaultWeights(): Promise<MatchWeights> {
        // Return cached value when available and fresh
        if (this.cache) {
            const age = Date.now() - this.cache.fetchedAt;
            if (this.ttlMs === 0 || age <= this.ttlMs) {
                logger.info('AdminService cache hit for default weights');
                return this.cache.weights;
            }
            logger.info('AdminService cache stale for default weights; refreshing');
            // stale -> fall through to refresh
        }

        try {
            const res = await pool.query('SELECT value FROM admin_settings WHERE key = $1', ['matching_default_weights']);
            if (res.rows && res.rows[0] && res.rows[0].value) {
                const merged = { ...defaultWeights, ...res.rows[0].value };
                this.cache = { weights: merged, fetchedAt: Date.now() };
                logger.info('AdminService cache updated for default weights');
                return merged;
            }
            this.cache = { weights: defaultWeights, fetchedAt: Date.now() };
            logger.info('AdminService cache set to defaults for default weights');
            return defaultWeights;
        } catch (err) {
            logger.error('Error fetching default weights, falling back to in-memory defaults', err);
            // If cache exists return it even if stale; otherwise fallback to defaults
            if (this.cache) {
                logger.warn('AdminService returning stale cached weights due to DB error');
                return this.cache.weights;
            }
            return defaultWeights;
        }
    }

    async updateDefaultWeights(weights: MatchWeights): Promise<MatchWeights> {
        try {
            const res = await pool.query(
                `INSERT INTO admin_settings (key, value) VALUES ($1, $2)
                 ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
                 RETURNING value`,
                ['matching_default_weights', weights]
            );
            const merged = { ...defaultWeights, ...res.rows[0].value };
            // Update cache immediately to reflect new settings
            this.cache = { weights: merged, fetchedAt: Date.now() };
            try {
                // broadcast invalidation so other instances can clear/refresh their caches
                await pool.query("NOTIFY admin_cache_invalidate, 'updated';");
            } catch (e) {
                // non-fatal
                logger.warn('Failed to send admin_cache_invalidate notification', e);
            }
            return merged;
        } catch (err) {
            logger.error('Error updating default weights', err);
            throw err;
        }
    }
}

export const adminService = new AdminService();
