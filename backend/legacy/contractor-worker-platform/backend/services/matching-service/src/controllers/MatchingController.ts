import { Request, Response } from 'express';
import { MatchingService } from '../services/MatchingService';
import { logger } from '../utils/logger';
import { AuthUser } from '../types';
import { validateWeights } from '../utils/validation';

interface AuthRequest extends Request {
    user?: AuthUser;
}

export class MatchingController {
    private matchingService: MatchingService;

    constructor() {
        this.matchingService = new MatchingService();
    }

    // Find matches for a contractor (find workers)
    findWorkers = async (req: AuthRequest, res: Response): Promise<void> => {
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
                experienceLevel: experienceLevel || 'intermediate'
            };

            // Validate weights if provided
            if (req.body.weights) {
                const validation = validateWeights(req.body.weights);
                if (!validation.ok) {
                    res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                    return;
                }
                // attach normalized weights
                (criteria as any).weights = validation.weights;
            }

            const result = await this.matchingService.findWorkersForCriteria(criteria);

            res.json({
                success: true,
                message: `Found ${result.totalCount} worker matches`,
                data: {
                    matches: result.matches,
                    criteria,
                    totalCount: result.totalCount,
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages
                }
            });

        } catch (error) {
            logger.error('Error finding workers:', error);
            res.status(500).json({
                success: false,
                message: 'Error finding worker matches',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Find matches for a worker (find contractors)
    findContractors = async (req: AuthRequest, res: Response): Promise<void> => {
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
                experienceLevel: experienceLevel || 'intermediate'
            };

            if (req.body.weights) {
                const validation = validateWeights(req.body.weights);
                if (!validation.ok) {
                    res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                    return;
                }
                (criteria as any).weights = validation.weights;
            }

            const result = await this.matchingService.findContractorsForCriteria(criteria);

            res.json({
                success: true,
                message: `Found ${result.totalCount} contractor matches`,
                data: {
                    matches: result.matches,
                    criteria,
                    totalCount: result.totalCount,
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages
                }
            });

        } catch (error) {
            logger.error('Error finding contractors:', error);
            res.status(500).json({
                success: false,
                message: 'Error finding contractor matches',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get user's match preferences
    getMatchPreferences = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const preferences = await this.matchingService.getUserMatchPreferences(req.user.id);

            res.json({
                success: true,
                message: 'Match preferences retrieved successfully',
                data: preferences
            });

        } catch (error) {
            logger.error('Error getting match preferences:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving match preferences',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Update match preferences
    updateMatchPreferences = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const {
                preferredSkillTypes,
                preferredLocations,
                maxDistance,
                budgetPreference,
                experiencePreference,
                urgencyPreference,
                workTypePreference,
                ratingThreshold,
                autoMatch
            } = req.body;

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
                if (updates[key as keyof typeof updates] === undefined) {
                    delete updates[key as keyof typeof updates];
                }
            });

            if (Object.keys(updates).length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'No valid update fields provided'
                });
                return;
            }

            const preferences = await this.matchingService.upsertMatchPreferences(req.user.id, updates);

            res.json({
                success: true,
                message: 'Match preferences updated successfully',
                data: preferences
            });

        } catch (error) {
            logger.error('Error updating match preferences:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating match preferences',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Save a match
    saveMatch = async (req: AuthRequest, res: Response): Promise<void> => {
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

            const savedMatch = await this.matchingService.saveMatch(req.user.id, {
                matchedUserId,
                matchType,
                matchScore,
                notes,
                isFavorite
            });

            res.status(201).json({
                success: true,
                message: 'Match saved successfully',
                data: savedMatch
            });

        } catch (error) {
            logger.error('Error saving match:', error);
            res.status(500).json({
                success: false,
                message: 'Error saving match',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get saved matches
    getSavedMatches = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const savedMatches = await this.matchingService.getSavedMatches(req.user.id);

            res.json({
                success: true,
                message: 'Saved matches retrieved successfully',
                data: savedMatches
            });

        } catch (error) {
            logger.error('Error getting saved matches:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving saved matches',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Delete a saved match
    deleteSavedMatch = async (req: AuthRequest, res: Response): Promise<void> => {
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

            await this.matchingService.deleteSavedMatch(req.user.id, matchId);

            res.json({
                success: true,
                message: 'Saved match deleted successfully'
            });

        } catch (error) {
            logger.error('Error deleting saved match:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting saved match',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get matching statistics for admin/analytics
    getMatchingStats = async (req: AuthRequest, res: Response): Promise<void> => {
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

        } catch (error) {
            logger.error('Error getting matching stats:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving matching statistics',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}