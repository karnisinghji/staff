"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgMatchingRepositoryAdapter = void 0;
const db_1 = require("../../../utils/db");
const location_1 = require("../../../utils/location");
const logger_1 = require("../../../utils/logger");
// Temporary environment-driven limits
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const MIN_SCORE = 0; // Temporarily lowered to debug search results
class PgMatchingRepositoryAdapter {
    // FIRST SLICE: Only implement findWorkers. Others throw until migrated.
    async findWorkers(criteria) {
        try {
            logger_1.logger.info(`FindWorkers: Starting search with criteria: ${JSON.stringify(criteria)}`);
            if (!criteria.location) {
                logger_1.logger.warn('FindWorkers: No location provided in criteria');
                return [];
            }
            // Check if we have fallback coordinates (US center) and expand search radius
            const isUSCenterFallback = Math.abs(criteria.location.lat - 39.8283) < 0.01 && Math.abs(criteria.location.lng - (-98.5795)) < 0.01;
            const effectiveMaxDistance = isUSCenterFallback ? 2000 : (criteria.maxDistanceKm || 25);
            if (isUSCenterFallback) {
                logger_1.logger.warn(`FindWorkers: Detected US center fallback coordinates, expanding search radius to ${effectiveMaxDistance}km`);
            }
            const skill = (criteria.skills && criteria.skills[0]) || null;
            if (!skill) {
                logger_1.logger.warn('FindWorkers: No skills provided in criteria');
                return [];
            }
            const query = `
                SELECT u.id as worker_id, u.name as worker_name, u.location, u.email, u.phone,
                       wp.skill_type, wp.experience_years, wp.hourly_rate, wp.rating,
                       wp.total_jobs, wp.availability_status, wp.is_available, wp.bio
                FROM users u
                INNER JOIN worker_profiles wp ON u.id = wp.id
                WHERE u.role = 'worker' AND u.is_active = true AND wp.skill_type = $1 AND wp.availability_status = 'available'
                ORDER BY wp.rating DESC, wp.total_jobs DESC
            `;
            const dbRes = await db_1.pool.query(query, [skill]);
            const workers = dbRes.rows || [];
            logger_1.logger.info(`FindWorkers: Found ${workers.length} workers with skill "${skill}" in database`);
            logger_1.logger.info(`FindWorkers: Search location is lat=${criteria.location.lat}, lng=${criteria.location.lng}`);
            // Convert search location to match calculateDistance format
            const searchLocation = { latitude: criteria.location.lat, longitude: criteria.location.lng };
            const results = await Promise.all(workers.map(async (w, index) => {
                if (!w.location) {
                    logger_1.logger.warn(`FindWorkers: Worker ${w.worker_name} has no location data`);
                    return null;
                }
                const workerLocation = await (0, location_1.geocodeLocation)(w.location);
                if (!workerLocation) {
                    logger_1.logger.warn(`FindWorkers: Failed to geocode location "${w.location}" for worker ${w.worker_name}`);
                    return null;
                }
                const distanceKm = (0, location_1.calculateDistance)(searchLocation, workerLocation);
                logger_1.logger.info(`FindWorkers: Distance from search location to ${w.location} (${w.worker_name}): ${distanceKm.toFixed(2)}km`);
                // Calculate enhanced score (similar to contractor scoring)
                const ratingScore = (w.rating || 0) * 20; // 0-100 scale
                const distanceScore = Math.max(0, 50 - distanceKm); // Closer = better, max 50 points
                const experienceScore = Math.min(30, (w.total_jobs || 0) * 2); // Max 30 points from experience
                const score = ratingScore + distanceScore + experienceScore;
                return {
                    id: w.worker_id,
                    name: w.worker_name,
                    skills: [w.skill_type],
                    location: w.location || 'Location not specified',
                    hourlyRate: w.hourly_rate || 0,
                    rating: w.rating || 0,
                    experienceYears: w.experience_years || 0,
                    totalJobs: w.total_jobs || 0,
                    availabilityStatus: w.availability_status,
                    bio: w.bio,
                    email: w.email,
                    phone: w.phone,
                    distanceKm: Math.round(distanceKm * 100) / 100, // Round to 2 decimal places
                    score: Math.round(score)
                };
            }));
            // Filter out null results and apply distance filter
            const validResults = results.filter(w => w !== null);
            let filteredResults = validResults;
            if (effectiveMaxDistance && effectiveMaxDistance > 0) {
                filteredResults = validResults.filter(worker => (worker.distanceKm ?? 999) <= effectiveMaxDistance);
            } // Sort by distance (closest first), then by score (highest first)
            filteredResults.sort((a, b) => {
                const distanceA = a.distanceKm || 999;
                const distanceB = b.distanceKm || 999;
                const scoreA = a.score || 0;
                const scoreB = b.score || 0;
                if (Math.abs(distanceA - distanceB) < 0.1) {
                    return scoreB - scoreA; // Same distance, sort by score
                }
                return distanceA - distanceB; // Sort by distance
            });
            logger_1.logger.info(`FindWorkers: Returning ${filteredResults.length} worker matches (filtered from ${validResults.length} by distance <= ${effectiveMaxDistance}km)`);
            return filteredResults;
        }
        catch (e) {
            logger_1.logger.error('PgMatchingRepositoryAdapter.findWorkers error', e);
            return [];
        }
    }
    async findContractors(criteria) {
        try {
            logger_1.logger.info(`FindContractors: Starting search with criteria: ${JSON.stringify(criteria)}`);
            // Simplified query to get contractors with their profile info
            const query = `
                SELECT u.id as contractor_id, u.name as contractor_name, u.location, u.email,
                       cp.company_name, cp.need_worker_status, cp.rating, cp.total_projects
                FROM users u
                INNER JOIN contractor_profiles cp ON u.id = cp.user_id
                WHERE u.role = 'contractor' AND u.is_active = true AND cp.need_worker_status = true
                ORDER BY cp.rating DESC, cp.total_projects DESC
                LIMIT $1
            `;
            const pageSize = Math.min(MAX_LIMIT, criteria.pageSize || DEFAULT_LIMIT);
            const dbRes = await db_1.pool.query(query, [pageSize]);
            const contractors = dbRes.rows || [];
            logger_1.logger.info(`FindContractors: Found ${contractors.length} contractors in database`);
            // Convert to ContractorCandidate format with real distance calculations
            const searchLocation = criteria.location ? { latitude: criteria.location.lat, longitude: criteria.location.lng } : null;
            if (searchLocation) {
                logger_1.logger.info(`FindContractors: Search location is lat=${searchLocation.latitude}, lng=${searchLocation.longitude}`);
                // Check if this is the US geographic center fallback (indicates location detection failed)
                if (Math.abs(searchLocation.latitude - 39.8283) < 0.01 && Math.abs(searchLocation.longitude - (-98.5795)) < 0.01) {
                    logger_1.logger.warn(`FindContractors: Using US center fallback location - expanding search radius`);
                    // Temporarily expand max distance to find contractors when using fallback location
                    if (criteria.maxDistanceKm && criteria.maxDistanceKm < 2000) {
                        criteria.maxDistanceKm = 2000; // Expand to 2000km to cover North America
                        logger_1.logger.info(`FindContractors: Expanded search radius to ${criteria.maxDistanceKm}km for fallback location`);
                    }
                }
            }
            const results = await Promise.all(contractors.map(async (c, index) => {
                let distanceKm = 999; // Default high distance if location can't be determined
                // Calculate real distance if we have search location and contractor location
                if (searchLocation && c.location) {
                    try {
                        const contractorLocation = await (0, location_1.geocodeLocation)(c.location);
                        if (contractorLocation) {
                            distanceKm = (0, location_1.calculateDistance)(searchLocation, contractorLocation);
                            logger_1.logger.info(`FindContractors: Distance from search location to ${c.location} (${c.company_name}): ${distanceKm}km`);
                        }
                        else {
                            logger_1.logger.warn(`FindContractors: Could not geocode contractor location: ${c.location}`);
                        }
                    }
                    catch (error) {
                        logger_1.logger.warn(`Failed to geocode contractor location: ${c.location}`, error);
                    }
                }
                // Calculate score based on rating, distance, and project count
                const ratingScore = (parseFloat(c.rating) || 0) * 20; // Max 100 points for 5-star rating
                const distanceScore = Math.max(0, 50 - distanceKm); // Closer = higher score, max 50 points
                const projectScore = Math.min(30, (c.total_projects || 0) * 0.5); // Max 30 points for experience
                const totalScore = Math.round(ratingScore + distanceScore + projectScore);
                return {
                    id: c.contractor_id,
                    skillsNeeded: [], // No specific skills needed for now
                    distanceKm: Math.round(distanceKm * 100) / 100, // Round to 2 decimal places
                    score: Math.max(0, Math.min(100, totalScore)), // Ensure score is between 0-100
                    // Add extra fields for display
                    contractorName: c.contractor_name,
                    companyName: c.company_name || 'Unknown Company',
                    location: c.location || 'Location not specified',
                    rating: c.rating || 0,
                    totalProjects: c.total_projects || 0,
                    needWorkerStatus: c.need_worker_status,
                    email: c.email
                };
            }));
            // Filter by max distance if specified
            let filteredResults = results;
            if (criteria.maxDistanceKm && criteria.maxDistanceKm > 0) {
                filteredResults = results.filter(contractor => (contractor.distanceKm || 999) <= criteria.maxDistanceKm);
            }
            // Sort by distance (closest first), then by score (highest first)
            filteredResults.sort((a, b) => {
                const distanceA = a.distanceKm || 999;
                const distanceB = b.distanceKm || 999;
                const scoreA = a.score || 0;
                const scoreB = b.score || 0;
                if (Math.abs(distanceA - distanceB) < 0.1) {
                    return scoreB - scoreA; // Same distance, sort by score
                }
                return distanceA - distanceB; // Sort by distance
            });
            logger_1.logger.info(`FindContractors: Returning ${filteredResults.length} contractor matches (filtered from ${results.length} by distance <= ${criteria.maxDistanceKm}km)`);
            return filteredResults;
        }
        catch (e) {
            logger_1.logger.error('PgMatchingRepositoryAdapter.findContractors error', e);
            return [];
        }
    }
    async upsertPreferences(prefs) {
        const existing = await db_1.pool.query('SELECT user_id FROM match_preferences WHERE user_id = $1', [prefs.userId]);
        if (existing.rowCount && existing.rowCount > 0) {
            await db_1.pool.query('UPDATE match_preferences SET max_distance = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2', [prefs.maxDistanceKm ?? null, prefs.userId]);
        }
        else {
            await db_1.pool.query('INSERT INTO match_preferences (user_id, max_distance) VALUES ($1, $2)', [prefs.userId, prefs.maxDistanceKm ?? null]);
        }
    }
    async getPreferences(userId) {
        const res = await db_1.pool.query('SELECT user_id, max_distance FROM match_preferences WHERE user_id = $1', [userId]);
        if (res.rowCount === 0)
            return null;
        const row = res.rows[0];
        return { userId: row.user_id, maxDistanceKm: row.max_distance ?? undefined };
    }
    async saveMatch(match) {
        await db_1.pool.query(`INSERT INTO saved_matches (id, user_id, matched_user_id, match_type, match_score, notes, is_favorite)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`, [match.id, match.userA, match.userB, 'worker', match.score || 0, (match.context && match.context.notes) || null, false]);
    }
    async listSavedMatches(userId, pagination) {
        const { page, pageSize } = pagination;
        const offset = (page - 1) * pageSize;
        const rowsRes = await db_1.pool.query(`SELECT id, user_id, matched_user_id, match_score, created_at FROM saved_matches WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`, [userId, pageSize, offset]);
        const countRes = await db_1.pool.query('SELECT COUNT(*)::int as c FROM saved_matches WHERE user_id = $1', [userId]);
        const matches = rowsRes.rows.map(r => ({ id: r.id, userA: r.user_id, userB: r.matched_user_id, createdAt: r.created_at, context: { score: r.match_score } }));
        const total = countRes.rows[0].c;
        return { matches, page, pageSize, total };
    }
    async deleteSavedMatch(userId, matchId) {
        const res = await db_1.pool.query('DELETE FROM saved_matches WHERE id = $1 AND user_id = $2', [matchId, userId]);
        return !!res.rowCount && res.rowCount > 0;
    }
    async getStats() {
        const workersRes = await db_1.pool.query("SELECT COUNT(*)::int AS c FROM users WHERE role = 'worker' AND is_active = true");
        const contractorsRes = await db_1.pool.query("SELECT COUNT(*)::int AS c FROM users WHERE role = 'contractor' AND is_active = true");
        const savedMatchesRes = await db_1.pool.query('SELECT COUNT(*)::int AS c FROM saved_matches');
        return {
            totalMatches: savedMatchesRes.rows[0].c,
            workers: workersRes.rows[0].c,
            contractors: contractorsRes.rows[0].c
        };
    }
    async updateWeightConfig(config) {
        await db_1.pool.query(`INSERT INTO admin_settings (key, value) VALUES ($1, $2)
             ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`, ['matching_default_weights_hex', config]);
    }
    async getWeightConfig() {
        const res = await db_1.pool.query('SELECT value FROM admin_settings WHERE key = $1', ['matching_default_weights_hex']);
        if (res.rowCount && res.rowCount > 0)
            return res.rows[0].value;
        return {};
    }
}
exports.PgMatchingRepositoryAdapter = PgMatchingRepositoryAdapter;
//# sourceMappingURL=PgMatchingRepositoryAdapter.js.map