"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingController = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Legacy MatchingService import removed during hex migration cleanup
// import { MatchingService } from '../services/MatchingService';
const hexagon_1 = require("../hexagon");
const logger_1 = require("../utils/logger");
const validation_1 = require("../utils/validation");
class MatchingController {
    constructor() {
        // Hex module now the sole execution path (legacy service removed)
        this.hex = (0, hexagon_1.buildMatchingModule)();
        // Find matches for a contractor (find workers)
        this.findWorkers = async (req, res) => {
            try {
                // Temporarily bypassing authentication for testing
                // if (!req.user) {
                //     res.status(401).json({
                //         success: false,
                //         message: 'Authentication required'
                //     });
                //     return;
                // }
                const { skillType, location, maxDistance, budgetRange, urgency, experienceLevel } = req.body;
                if (!skillType || !location || !maxDistance) {
                    res.status(400).json({
                        success: false,
                        message: 'skillType, location, and maxDistance are required'
                    });
                    return;
                }
                const criteria = {
                    skillType,
                    location,
                    maxDistance: Math.min(maxDistance, parseInt(process.env.MAX_MATCHING_DISTANCE_KM || '50')),
                    budgetRange,
                    urgency: urgency || 'medium',
                    experienceLevel: experienceLevel || 'intermediate',
                    page: req.body.page,
                    limit: req.body.limit
                };
                // Validate weights if provided
                if (req.body.weights) {
                    const validation = (0, validation_1.validateWeights)(req.body.weights);
                    if (!validation.ok) {
                        res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                        return;
                    }
                    // attach normalized weights
                    criteria.weights = validation.weights;
                }
                // Hex path (legacy removed)
                const hexCriteria = {
                    requesterId: req.user?.id || 'anonymous',
                    skills: [skillType],
                    location: undefined, // TODO: map to GeoPoint once location normalization added
                    maxDistanceKm: criteria.maxDistance,
                    page: criteria.page,
                    pageSize: criteria.limit
                };
                const workers = await this.hex.useCases.findWorkers.execute(hexCriteria);
                res.json({
                    success: true,
                    message: `Found ${workers.length} worker matches`,
                    data: {
                        matches: workers,
                        criteria,
                        totalCount: workers.length,
                        page: criteria.page || 1,
                        limit: criteria.limit || workers.length,
                        totalPages: 1
                    }
                });
            }
            catch (error) {
                logger_1.logger.error('Error finding workers:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error finding worker matches',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Find matches for a worker (find contractors)
        this.findContractors = async (req, res) => {
            try {
                // Temporarily bypassing authentication for testing
                // if (!req.user) {
                //     res.status(401).json({
                //         success: false,
                //         message: 'Authentication required'
                //     });
                //     return;
                // }
                const { skillType, location, maxDistance, budgetRange, urgency, experienceLevel } = req.body;
                if (!location || !maxDistance) {
                    res.status(400).json({
                        success: false,
                        message: 'location and maxDistance are required'
                    });
                    return;
                }
                const criteria = {
                    skillType: skillType || '',
                    location,
                    maxDistance: Math.min(maxDistance, parseInt(process.env.MAX_MATCHING_DISTANCE_KM || '50')),
                    budgetRange,
                    urgency: urgency || 'medium',
                    experienceLevel: experienceLevel || 'intermediate',
                    page: req.body.page,
                    limit: req.body.limit
                };
                if (req.body.weights) {
                    const validation = (0, validation_1.validateWeights)(req.body.weights);
                    if (!validation.ok) {
                        res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                        return;
                    }
                    criteria.weights = validation.weights;
                }
                const hexCriteria = {
                    requesterId: req.user?.id || 'anonymous',
                    skillsNeeded: skillType ? [skillType] : [],
                    location: undefined,
                    maxDistanceKm: criteria.maxDistance,
                    page: criteria.page,
                    pageSize: criteria.limit
                };
                const contractors = await this.hex.useCases.findContractors.execute(hexCriteria);
                res.json({
                    success: true,
                    message: `Found ${contractors.length} contractor matches`,
                    data: {
                        matches: contractors,
                        criteria,
                        totalCount: contractors.length,
                        page: criteria.page || 1,
                        limit: criteria.limit || contractors.length,
                        totalPages: 1
                    }
                });
            }
            catch (error) {
                logger_1.logger.error('Error finding contractors:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error finding contractor matches',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get user's match preferences
        this.getMatchPreferences = async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                    return;
                }
                const prefs = await this.hex.useCases.getPreferences.execute(req.user.id);
                res.json({ success: true, message: 'Match preferences retrieved successfully', data: prefs });
            }
            catch (error) {
                logger_1.logger.error('Error getting match preferences:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error retrieving match preferences',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Update match preferences
        this.updateMatchPreferences = async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                    return;
                }
                const { preferredSkillTypes, preferredLocations, maxDistance, budgetPreference, experiencePreference, urgencyPreference, workTypePreference, ratingThreshold, autoMatch } = req.body;
                const updates = {
                    preferredSkillTypes,
                    preferredLocations,
                    maxDistance,
                    budgetPreference,
                    experiencePreference,
                    urgencyPreference,
                    workTypePreference,
                    ratingThreshold,
                    autoMatch
                };
                // Remove undefined values
                Object.keys(updates).forEach(key => {
                    if (updates[key] === undefined) {
                        delete updates[key];
                    }
                });
                if (Object.keys(updates).length === 0) {
                    res.status(400).json({
                        success: false,
                        message: 'No valid update fields provided'
                    });
                    return;
                }
                await this.hex.useCases.upsertPreferences.execute({ userId: req.user.id, maxDistanceKm: updates.maxDistance });
                const fresh = await this.hex.useCases.getPreferences.execute(req.user.id);
                res.json({ success: true, message: 'Match preferences updated successfully', data: fresh });
            }
            catch (error) {
                logger_1.logger.error('Error updating match preferences:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error updating match preferences',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Save a match
        this.saveMatch = async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                    return;
                }
                const { matchedUserId, matchType, matchScore, notes, isFavorite } = req.body;
                if (!matchedUserId || !matchType || matchScore === undefined) {
                    res.status(400).json({
                        success: false,
                        message: 'matchedUserId, matchType, and matchScore are required'
                    });
                    return;
                }
                const matchId = crypto_1.default.randomUUID();
                await this.hex.useCases.saveMatch.execute({ id: matchId, userA: req.user.id, userB: matchedUserId, createdAt: new Date(), context: { matchType, matchScore, notes, isFavorite } });
                res.status(201).json({ success: true, message: 'Match saved successfully', data: { id: matchId } });
            }
            catch (error) {
                logger_1.logger.error('Error saving match:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error saving match',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get saved matches
        this.getSavedMatches = async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                    return;
                }
                const page = parseInt(req.query.page || '1');
                const pageSize = parseInt(req.query.pageSize || '20');
                const result = await this.hex.useCases.listSavedMatches.execute(req.user.id, page, pageSize);
                res.json({ success: true, message: 'Saved matches retrieved successfully', data: result });
            }
            catch (error) {
                logger_1.logger.error('Error getting saved matches:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error retrieving saved matches',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Delete a saved match
        this.deleteSavedMatch = async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                    return;
                }
                const { matchId } = req.params;
                if (!matchId) {
                    res.status(400).json({
                        success: false,
                        message: 'matchId parameter is required'
                    });
                    return;
                }
                const ok = await this.hex.useCases.deleteSavedMatch.execute(req.user.id, matchId);
                res.json({ success: ok, message: ok ? 'Saved match deleted successfully' : 'Saved match not found' });
            }
            catch (error) {
                logger_1.logger.error('Error deleting saved match:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error deleting saved match',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get matching statistics for admin/analytics
        this.getMatchingStats = async (req, res) => {
            try {
                // This would typically require admin role
                const stats = {
                    totalActiveWorkers: 0,
                    totalActiveContractors: 0,
                    totalMatchesGenerated: 0,
                    totalSavedMatches: 0,
                    averageMatchScore: 0,
                    topSkillTypes: [],
                    topLocations: []
                };
                res.json({
                    success: true,
                    message: 'Matching statistics retrieved successfully',
                    data: stats
                });
            }
            catch (error) {
                logger_1.logger.error('Error getting matching stats:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error retrieving matching statistics',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Legacy MatchingService instance creation removed
    }
}
exports.MatchingController = MatchingController;
//# sourceMappingURL=MatchingController.js.map