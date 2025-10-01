"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgMatchingRepositoryAdapter = void 0;
const db_1 = require("../../../utils/db");
const location_1 = require("../../../utils/location");
const matching_1 = require("../../../utils/matching");
const logger_1 = require("../../../utils/logger");
// Temporary environment-driven limits
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const MIN_SCORE = 30;
class PgMatchingRepositoryAdapter {
    // FIRST SLICE: Only implement findWorkers. Others throw until migrated.
    async findWorkers(criteria) {
        try {
            if (!criteria.location)
                return [];
            const criteriaLocation = await (0, location_1.geocodeLocation)(`${criteria.location.lat},${criteria.location.lng}`); // TODO replace with proper forward geocode call when location type finalized
            if (!criteriaLocation)
                return [];
            // For this first slice we reuse legacy query (skill filtering simplified)
            const skill = (criteria.skills && criteria.skills[0]) || null;
            if (!skill)
                return [];
            const query = `
                SELECT u.id as worker_id, u.name as worker_name, u.location,
                       wp.skill_type, wp.experience_years, wp.hourly_rate, wp.rating,
                       wp.total_jobs, wp.availability_status, wp.is_available, wp.description
                FROM users u
                INNER JOIN worker_profiles wp ON u.id = wp.id
                WHERE u.role = 'worker' AND u.is_active = true AND wp.skill_type = $1 AND wp.availability_status = 'available'
                ORDER BY wp.rating DESC, wp.total_jobs DESC
            `;
            const dbRes = await db_1.pool.query(query, [skill]);
            const workers = dbRes.rows || [];
            const enriched = [];
            for (const w of workers) {
                if (!w.location)
                    continue;
                const wLoc = await (0, location_1.geocodeLocation)(w.location);
                if (!wLoc)
                    continue;
                const distanceKm = (0, location_1.calculateDistance)(criteriaLocation, wLoc);
                if (typeof criteria.maxDistanceKm === 'number' && distanceKm > criteria.maxDistanceKm)
                    continue;
                const score = (0, matching_1.calculateWorkerMatchScore)({ ...w, matchScore: 0 }, // legacy util expects object with working fields
                wLoc, {
                    skillType: w.skill_type,
                    location: w.location,
                    maxDistance: criteria.maxDistanceKm ?? 999999,
                    urgency: 'medium',
                    experienceLevel: 'intermediate'
                }, criteriaLocation, criteria.weights);
                enriched.push({ id: w.worker_id, skills: [w.skill_type], distanceKm, score, matchScore: score });
            }
            const sorted = (0, matching_1.sortMatchesByScore)(enriched); // returns array with matchScore
            const filteredWithScore = (0, matching_1.filterByMinimumScore)(sorted, MIN_SCORE);
            const filtered = filteredWithScore.map(w => ({ id: w.id, skills: w.skills, distanceKm: w.distanceKm, score: w.score }));
            const page = Math.max(1, criteria.page || 1);
            const pageSize = Math.min(MAX_LIMIT, criteria.pageSize || DEFAULT_LIMIT);
            const offset = (page - 1) * pageSize;
            return filtered.slice(offset, offset + pageSize);
        }
        catch (e) {
            logger_1.logger.error('PgMatchingRepositoryAdapter.findWorkers error', e);
            return [];
        }
    }
    async findContractors(criteria) {
        try {
            if (!criteria.location)
                return [];
            const criteriaLocation = await (0, location_1.geocodeLocation)(`${criteria.location.lat},${criteria.location.lng}`);
            if (!criteriaLocation)
                return [];
            const query = `
                SELECT u.id as contractor_id, u.name as contractor_name, u.location,
                       cp.company_name, cp.need_worker_status, cp.rating, cp.total_projects
                FROM users u
                INNER JOIN contractor_profiles cp ON u.id = cp.id
                WHERE u.role = 'contractor' AND u.is_active = true
                ORDER BY cp.rating DESC, cp.total_projects DESC
            `;
            const dbRes = await db_1.pool.query(query);
            const contractors = dbRes.rows || [];
            const enriched = [];
            for (const c of contractors) {
                if (!c.location)
                    continue;
                const cLoc = await (0, location_1.geocodeLocation)(c.location);
                if (!cLoc)
                    continue;
                const distanceKm = (0, location_1.calculateDistance)(criteriaLocation, cLoc);
                if (typeof criteria.maxDistanceKm === 'number' && distanceKm > criteria.maxDistanceKm)
                    continue;
                const score = (0, matching_1.calculateContractorMatchScore)({ ...c, matchScore: 0 }, cLoc, {
                    skillType: (criteria.skillsNeeded && criteria.skillsNeeded[0]) || '',
                    location: c.location,
                    maxDistance: criteria.maxDistanceKm ?? 999999,
                    urgency: 'medium',
                    experienceLevel: 'intermediate'
                }, criteriaLocation, criteria.weights);
                enriched.push({ id: c.contractor_id, skillsNeeded: [], distanceKm, score, matchScore: score });
            }
            const sorted = (0, matching_1.sortMatchesByScore)(enriched);
            const filteredWithScore = (0, matching_1.filterByMinimumScore)(sorted, MIN_SCORE);
            const filtered = filteredWithScore.map(c => ({ id: c.id, skillsNeeded: c.skillsNeeded, distanceKm: c.distanceKm, score: c.score }));
            const page = Math.max(1, criteria.page || 1);
            const pageSize = Math.min(MAX_LIMIT, criteria.pageSize || DEFAULT_LIMIT);
            const offset = (page - 1) * pageSize;
            return filtered.slice(offset, offset + pageSize);
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