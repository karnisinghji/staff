"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingService = void 0;
/**
 * DEPRECATED: Legacy MatchingService retained temporarily for reference during hex migration.
 * All controller routes now use hex use cases exclusively. This file will be removed after
 * test coverage confirms parity.
 */
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const location_1 = require("../utils/location");
const matching_1 = require("../utils/matching");
class MatchingService {
    // No need for a private pool property; use shared pool directly
    // Allow tests to shut down the shared pool
    static async shutdown() {
        try {
            await db_1.pool.end();
        }
        catch (err) {
            // ignore
        }
    }
    /**
     * Find workers matching criteria with robust paging/filtering and edge case handling.
     * Paging: Use 'page' and 'limit' in criteria. Default limit is 20, max 100.
     * Filtering: Minimum match score is 30. Results sorted by score.
     * Edge cases: Handles missing location, zero results, invalid input.
     */
    async findWorkersForCriteria(criteria) {
        try {
            logger_1.logger.info('Finding workers for criteria:', criteria);
            if (!criteria.location) {
                logger_1.logger.warn('No location provided in criteria');
                return { matches: [], totalCount: 0, page: 1, limit: 20, totalPages: 1 };
            }
            const criteriaLocation = await (0, location_1.geocodeLocation)(criteria.location);
            if (!criteriaLocation) {
                logger_1.logger.warn('Could not geocode criteria location');
                return { matches: [], totalCount: 0, page: 1, limit: 20, totalPages: 1 };
            }
            // Query to find workers with their profiles
            const query = `
                    SELECT 
                        u.id as worker_id,
                        u.name as worker_name,
                        u.location,
                        wp.skill_type,
                        wp.experience_years,
                        wp.hourly_rate,
                        wp.bio,
                        wp.rating,
                        wp.total_jobs,
                        wp.availability_status,
                        wp.is_available,
                        wp.description
                    FROM users u
                    INNER JOIN worker_profiles wp ON u.id = wp.id
                    WHERE u.role = 'worker' 
                        AND u.is_active = true
                        AND wp.skill_type = $1
                        AND wp.availability_status = 'available'
                    ORDER BY wp.rating DESC, wp.total_jobs DESC
                `;
            const result = await db_1.pool.query(query, [criteria.skillType]);
            const workers = result.rows || [];
            if (workers.length === 0) {
                logger_1.logger.info('No workers found for criteria');
                return { matches: [], totalCount: 0, page: 1, limit: 20, totalPages: 1 };
            }
            const matches = [];
            for (const worker of workers) {
                if (!worker.location)
                    continue;
                const workerLocation = await (0, location_1.geocodeLocation)(worker.location);
                if (!workerLocation)
                    continue;
                const distance = (0, location_1.calculateDistance)(criteriaLocation, workerLocation);
                if (criteria.maxDistance && distance > criteria.maxDistance)
                    continue;
                // Advanced filtering
                if (criteria.experienceLevel) {
                    const exp = worker.experience_years || 0;
                    if ((criteria.experienceLevel === 'beginner' && exp > 2) ||
                        (criteria.experienceLevel === 'intermediate' && (exp < 3 || exp > 7)) ||
                        (criteria.experienceLevel === 'expert' && exp < 8))
                        continue;
                }
                if (criteria.rating && worker.rating < criteria.rating)
                    continue;
                if (criteria.availability && worker.availability_status !== criteria.availability)
                    continue;
                // Apply budget filter if specified
                if (criteria.budgetRange && worker.hourly_rate > criteria.budgetRange.max)
                    continue;
                const matchScore = (0, matching_1.calculateWorkerMatchScore)(worker, workerLocation, criteria, criteriaLocation, criteria.weights);
                matches.push({
                    workerId: worker.worker_id,
                    workerName: worker.worker_name,
                    skillType: worker.skill_type,
                    experienceYears: worker.experience_years || 0,
                    hourlyRate: worker.hourly_rate || 0,
                    location: worker.location,
                    distance,
                    rating: worker.rating || 0,
                    completedJobs: worker.total_jobs || 0,
                    availability: worker.availability_status || 'flexible',
                    isAvailable: worker.is_available || false,
                    matchScore,
                    description: worker.description || ''
                });
            }
            // Sort by match score and apply filters
            const sortedMatches = (0, matching_1.sortMatchesByScore)(matches);
            const filteredMatches = (0, matching_1.filterByMinimumScore)(sortedMatches, 30);
            const totalCount = filteredMatches.length;
            const page = Math.max(1, criteria.page || 1);
            const limit = Math.min(100, criteria.limit || parseInt(process.env.MAX_MATCHES_PER_REQUEST || '20'));
            const totalPages = Math.max(1, Math.ceil(totalCount / limit));
            const offset = (page - 1) * limit;
            let paginated = [];
            if (offset < totalCount) {
                paginated = filteredMatches.slice(offset, offset + limit);
            }
            return {
                matches: paginated,
                totalCount,
                page,
                limit,
                totalPages
            };
        }
        catch (error) {
            logger_1.logger.error('Error finding workers for criteria:', error);
            return { matches: [], totalCount: 0, page: 1, limit: 20, totalPages: 1 };
        }
    }
    // Find contractors matching criteria (for workers looking for jobs)
    async findContractorsForCriteria(criteria) {
        try {
            logger_1.logger.info('Finding contractors for criteria:', criteria);
            const criteriaLocation = await (0, location_1.geocodeLocation)(criteria.location);
            if (!criteriaLocation) {
                throw new Error('Could not geocode criteria location');
            }
            // Query to find contractors with their profiles
            const query = `
                    SELECT 
                        u.id as contractor_id,
                        u.name as contractor_name,
                        u.location,
                                            cp.company_name,
                                            cp.need_worker_status,
                                            cp.rating,
                                            cp.total_projects
                                    FROM users u
                                    INNER JOIN contractor_profiles cp ON u.id = cp.id
                    WHERE u.role = 'contractor' 
                                        AND u.is_active = true
                                    ORDER BY cp.rating DESC, cp.total_projects DESC
                `;
            const result = await db_1.pool.query(query);
            const contractors = result.rows;
            const matches = [];
            for (const contractor of contractors) {
                const contractorLocation = await (0, location_1.geocodeLocation)(contractor.location);
                if (!contractorLocation)
                    continue;
                const distance = (0, location_1.calculateDistance)(criteriaLocation, contractorLocation);
                if (distance <= criteria.maxDistance) {
                    const matchScore = (0, matching_1.calculateContractorMatchScore)(contractor, contractorLocation, criteria, criteriaLocation, criteria.weights);
                    matches.push({
                        contractorId: contractor.contractor_id,
                        contractorName: contractor.contractor_name,
                        companyName: contractor.company_name || contractor.contractor_name,
                        location: contractor.location,
                        distance,
                        rating: contractor.rating || 0,
                        totalJobsPosted: contractor.total_projects || 0,
                        verificationStatus: contractor.need_worker_status ? 'verified' : 'pending',
                        matchScore,
                        companyDescription: contractor.company_name || ''
                    });
                }
            }
            // Sort and filter
            const sortedMatches = (0, matching_1.sortMatchesByScore)(matches);
            const filteredMatches = (0, matching_1.filterByMinimumScore)(sortedMatches, 30);
            const totalCount = filteredMatches.length;
            const page = Math.max(1, criteria.page || 1);
            const limit = Math.min(100, criteria.limit || parseInt(process.env.MAX_MATCHES_PER_REQUEST || '20'));
            const offset = (page - 1) * limit;
            const paginated = filteredMatches.slice(offset, offset + limit);
            return {
                matches: paginated,
                totalCount,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(totalCount / limit))
            };
        }
        catch (error) {
            logger_1.logger.error('Error finding contractors for criteria:', error);
            throw error;
        }
    }
    // Get user's match preferences
    async getUserMatchPreferences(userId) {
        try {
            const result = await db_1.pool.query('SELECT * FROM match_preferences WHERE user_id = $1', [userId]);
            return result.rows[0] || null;
        }
        catch (error) {
            logger_1.logger.error('Error getting user match preferences:', error);
            throw error;
        }
    }
    // Create or update match preferences
    async upsertMatchPreferences(userId, preferences) {
        try {
            const existing = await this.getUserMatchPreferences(userId);
            let query;
            let values;
            if (existing) {
                // Update existing preferences
                const updateFields = [];
                const updateValues = [];
                let paramCount = 1;
                if (preferences.preferredSkillTypes !== undefined) {
                    updateFields.push(`preferred_skill_types = $${paramCount}`);
                    updateValues.push(JSON.stringify(preferences.preferredSkillTypes));
                    paramCount++;
                }
                if (preferences.preferredLocations !== undefined) {
                    updateFields.push(`preferred_locations = $${paramCount}`);
                    updateValues.push(JSON.stringify(preferences.preferredLocations));
                    paramCount++;
                }
                if (preferences.maxDistance !== undefined) {
                    updateFields.push(`max_distance = $${paramCount}`);
                    updateValues.push(preferences.maxDistance);
                    paramCount++;
                }
                if (preferences.budgetPreference !== undefined) {
                    updateFields.push(`budget_preference = $${paramCount}`);
                    updateValues.push(JSON.stringify(preferences.budgetPreference));
                    paramCount++;
                }
                if (preferences.experiencePreference !== undefined) {
                    updateFields.push(`experience_preference = $${paramCount}`);
                    updateValues.push(preferences.experiencePreference);
                    paramCount++;
                }
                if (preferences.urgencyPreference !== undefined) {
                    updateFields.push(`urgency_preference = $${paramCount}`);
                    updateValues.push(preferences.urgencyPreference);
                    paramCount++;
                }
                if (preferences.workTypePreference !== undefined) {
                    updateFields.push(`work_type_preference = $${paramCount}`);
                    updateValues.push(preferences.workTypePreference);
                    paramCount++;
                }
                if (preferences.ratingThreshold !== undefined) {
                    updateFields.push(`rating_threshold = $${paramCount}`);
                    updateValues.push(preferences.ratingThreshold);
                    paramCount++;
                }
                if (preferences.autoMatch !== undefined) {
                    updateFields.push(`auto_match = $${paramCount}`);
                    updateValues.push(preferences.autoMatch);
                    paramCount++;
                }
                updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
                updateValues.push(userId);
                query = `
                        UPDATE match_preferences 
                        SET ${updateFields.join(', ')} 
                        WHERE user_id = $${paramCount} 
                        RETURNING *
                    `;
                values = updateValues;
            }
            else {
                // Create new preferences with defaults
                query = `
                        INSERT INTO match_preferences (
                            user_id, preferred_skill_types, preferred_locations, max_distance,
                            budget_preference, experience_preference, urgency_preference,
                            work_type_preference, rating_threshold, auto_match
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                        RETURNING *
                    `;
                values = [
                    userId,
                    JSON.stringify(preferences.preferredSkillTypes || []),
                    JSON.stringify(preferences.preferredLocations || []),
                    preferences.maxDistance || 25,
                    JSON.stringify(preferences.budgetPreference || null),
                    preferences.experiencePreference || 'any',
                    preferences.urgencyPreference || 'any',
                    preferences.workTypePreference || 'any',
                    preferences.ratingThreshold || 3.0,
                    preferences.autoMatch !== undefined ? preferences.autoMatch : true
                ];
            }
            const result = await db_1.pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            logger_1.logger.error('Error upserting match preferences:', error);
            throw error;
        }
    }
    // Save a match for later reference
    async saveMatch(userId, matchData) {
        try {
            const query = `
                    INSERT INTO saved_matches (user_id, matched_user_id, match_type, match_score, notes, is_favorite)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING *
                `;
            const values = [
                userId,
                matchData.matchedUserId,
                matchData.matchType,
                matchData.matchScore,
                matchData.notes || null,
                matchData.isFavorite || false
            ];
            const result = await db_1.pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            logger_1.logger.error('Error saving match:', error);
            throw error;
        }
    }
    // Get user's saved matches
    async getSavedMatches(userId) {
        try {
            const result = await db_1.pool.query(`SELECT sm.*, u.name as matched_user_name, u.role as matched_user_role,
                        wp.is_available
                     FROM saved_matches sm 
                     JOIN users u ON sm.matched_user_id = u.id 
                     LEFT JOIN worker_profiles wp ON sm.matched_user_id = wp.user_id
                     WHERE sm.user_id = $1 
                     ORDER BY sm.is_favorite DESC, sm.created_at DESC`, [userId]);
            return result.rows;
        }
        catch (error) {
            logger_1.logger.error('Error getting saved matches:', error);
            throw error;
        }
    }
    // Delete a saved match
    async deleteSavedMatch(userId, matchId) {
        try {
            const result = await db_1.pool.query('DELETE FROM saved_matches WHERE id = $1 AND user_id = $2', [matchId, userId]);
            if (result.rowCount === 0) {
                throw new Error('Saved match not found');
            }
        }
        catch (error) {
            logger_1.logger.error('Error deleting saved match:', error);
            throw error;
        }
    }
}
exports.MatchingService = MatchingService;
//# sourceMappingURL=MatchingService.js.map