import { Request, Response } from 'express';
import crypto from 'crypto';
// Legacy MatchingService import removed during hex migration cleanup
// import { MatchingService } from '../services/MatchingService';
import { buildMatchingModule } from '../hexagon';
import { logger } from '../utils/logger';
import { validateWeights } from '../utils/validation';
import { geocodeLocation } from '../utils/location';
import { pool } from '../utils/db';

export class MatchingController {
    // Hex module now the sole execution path (legacy service removed)
    private hex = buildMatchingModule();

    constructor() {
        // Legacy MatchingService instance creation removed
    }

    // Find matches for a contractor (find workers)
    findWorkers = async (req: Request, res: Response): Promise<void> => {
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

            const criteria: any = {
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
                const validation = validateWeights(req.body.weights);
                if (!validation.ok) {
                    res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                    return;
                }
                // attach normalized weights
                (criteria as any).weights = validation.weights;
            }

            // Convert location string to coordinates
            let locationCoords = null;
            if (location) {
                // Try to parse coordinates from location string
                const coordMatch = location.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
                if (coordMatch) {
                    locationCoords = { lat: parseFloat(coordMatch[1]), lng: parseFloat(coordMatch[2]) };
                } else {
                    // Geocode the location string
                    const geocoded = await geocodeLocation(location);
                    if (geocoded) {
                        locationCoords = { lat: geocoded.latitude, lng: geocoded.longitude };
                    }
                }
            }

            // Hex path (legacy removed)
            const hexCriteria = {
                requesterId: req.user?.id || 'anonymous',
                skills: [skillType],
                location: locationCoords,
                maxDistanceKm: criteria.maxDistance,
                page: criteria.page,
                pageSize: criteria.limit
            } as any;
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
    findContractors = async (req: Request, res: Response): Promise<void> => {
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

            const criteria: any = {
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
                const validation = validateWeights(req.body.weights);
                if (!validation.ok) {
                    res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                    return;
                }
                (criteria as any).weights = validation.weights;
            }

            // Convert location string to coordinates for hex criteria
            const locationCoords = await geocodeLocation(location);
            const hexCriteria = {
                requesterId: req.user?.id || 'anonymous',
                skillsNeeded: skillType ? [skillType] : [],
                location: locationCoords ? { lat: locationCoords.latitude, lng: locationCoords.longitude } : undefined,
                maxDistanceKm: criteria.maxDistance,
                page: criteria.page,
                pageSize: criteria.limit
            } as any;
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
    getMatchPreferences = async (req: Request, res: Response): Promise<void> => {
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
    updateMatchPreferences = async (req: Request, res: Response): Promise<void> => {
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

            await this.hex.useCases.upsertPreferences.execute({ userId: req.user.id, maxDistanceKm: updates.maxDistance });
            const fresh = await this.hex.useCases.getPreferences.execute(req.user.id);
            res.json({ success: true, message: 'Match preferences updated successfully', data: fresh });

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
    saveMatch = async (req: Request, res: Response): Promise<void> => {
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

            const matchId = crypto.randomUUID();
            await this.hex.useCases.saveMatch.execute({ id: matchId, userA: req.user.id, userB: matchedUserId, createdAt: new Date(), context: { matchType, matchScore, notes, isFavorite } });
            res.status(201).json({ success: true, message: 'Match saved successfully', data: { id: matchId } });

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
    getSavedMatches = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const page = parseInt((req.query.page as string) || '1');
            const pageSize = parseInt((req.query.pageSize as string) || '20');
            const result = await this.hex.useCases.listSavedMatches.execute(req.user.id, page, pageSize);
            res.json({ success: true, message: 'Saved matches retrieved successfully', data: result });

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
    deleteSavedMatch = async (req: Request, res: Response): Promise<void> => {
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
    getMatchingStats = async (req: Request, res: Response): Promise<void> => {
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

    // Send team request (replaces "Save for Later")
    sendTeamRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { receiverId, message, matchContext } = req.body;
            const senderId = req.user.id;

            // Check if user is trying to send request to themselves
            if (senderId === receiverId) {
                res.status(400).json({ success: false, message: 'Cannot send team request to yourself' });
                return;
            }

            // Check if request already exists
            const existingRequest = await pool.query(
                'SELECT id, status FROM team_requests WHERE sender_id = $1 AND receiver_id = $2',
                [senderId, receiverId]
            );

            if (existingRequest.rows.length > 0) {
                const existing = existingRequest.rows[0];
                if (existing.status === 'pending') {
                    res.status(400).json({ success: false, message: 'Team request already pending' });
                    return;
                } else if (existing.status === 'accepted') {
                    res.status(400).json({ success: false, message: 'Already team members' });
                    return;
                }
            }

            // Insert or update team request
            const result = await pool.query(`
                INSERT INTO team_requests (sender_id, receiver_id, message, match_context, status)
                VALUES ($1, $2, $3, $4, 'pending')
                ON CONFLICT (sender_id, receiver_id) 
                DO UPDATE SET 
                    message = EXCLUDED.message,
                    match_context = EXCLUDED.match_context,
                    status = 'pending',
                    created_at = CURRENT_TIMESTAMP,
                    expires_at = CURRENT_TIMESTAMP + INTERVAL '30 days'
                RETURNING id, created_at
            `, [senderId, receiverId, message || null, JSON.stringify(matchContext || {})]);

            res.json({
                success: true,
                message: 'Team request sent successfully',
                data: { requestId: result.rows[0].id, createdAt: result.rows[0].created_at }
            });

        } catch (error) {
            logger.error('Error sending team request:', error);
            res.status(500).json({
                success: false,
                message: 'Error sending team request',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get received team requests
    getReceivedTeamRequests = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const result = await pool.query(`
                SELECT 
                    tr.id,
                    tr.sender_id,
                    tr.message,
                    tr.match_context,
                    tr.status,
                    tr.created_at,
                    tr.expires_at,
                    u.name as sender_name,
                    u.email as sender_email,
                    u.role as sender_role,
                    CASE 
                        WHEN u.role = 'contractor' THEN cp.company_name
                        ELSE NULL 
                    END as sender_company
                FROM team_requests tr
                JOIN users u ON tr.sender_id = u.id
                LEFT JOIN contractor_profiles cp ON u.id = cp.user_id
                WHERE tr.receiver_id = $1 
                AND tr.status = 'pending'
                AND tr.expires_at > CURRENT_TIMESTAMP
                ORDER BY tr.created_at DESC
            `, [req.user.id]);

            res.json({
                success: true,
                message: `Found ${result.rows.length} pending team requests`,
                data: { requests: result.rows }
            });

        } catch (error) {
            logger.error('Error getting received team requests:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving team requests',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get sent team requests
    getSentTeamRequests = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const result = await pool.query(`
                SELECT 
                    tr.id,
                    tr.receiver_id,
                    tr.message,
                    tr.match_context,
                    tr.status,
                    tr.created_at,
                    tr.updated_at,
                    tr.expires_at,
                    u.name as receiver_name,
                    u.email as receiver_email,
                    u.role as receiver_role,
                    CASE 
                        WHEN u.role = 'contractor' THEN cp.company_name
                        ELSE NULL 
                    END as receiver_company
                FROM team_requests tr
                JOIN users u ON tr.receiver_id = u.id
                LEFT JOIN contractor_profiles cp ON u.id = cp.user_id
                WHERE tr.sender_id = $1
                ORDER BY tr.created_at DESC
            `, [req.user.id]);

            res.json({
                success: true,
                message: `Found ${result.rows.length} sent team requests`,
                data: { requests: result.rows }
            });

        } catch (error) {
            logger.error('Error getting sent team requests:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving sent team requests',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Accept or reject team request
    updateTeamRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { requestId } = req.params;
            const { status } = req.body;

            // Get the request details
            const requestResult = await pool.query(
                'SELECT sender_id, receiver_id, status as current_status FROM team_requests WHERE id = $1',
                [requestId]
            );

            if (requestResult.rows.length === 0) {
                res.status(404).json({ success: false, message: 'Team request not found' });
                return;
            }

            const request = requestResult.rows[0];

            // Check if user is the receiver of this request
            if (request.receiver_id !== req.user.id) {
                res.status(403).json({ success: false, message: 'Not authorized to update this request' });
                return;
            }

            // Check if request is still pending
            if (request.current_status !== 'pending') {
                res.status(400).json({ success: false, message: 'Request has already been processed' });
                return;
            }

            // Start transaction
            await pool.query('BEGIN');

            try {
                // Update the request status
                await pool.query(
                    'UPDATE team_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
                    [status, requestId]
                );

                // If accepted, create team member relationships
                if (status === 'accepted') {
                    // Determine relationship type based on roles
                    const senderRole = await pool.query('SELECT role FROM users WHERE id = $1', [request.sender_id]);
                    const receiverRole = await pool.query('SELECT role FROM users WHERE id = $1', [request.receiver_id]);

                    let relationshipType = 'teammate';
                    if (senderRole.rows[0]?.role === 'worker' && receiverRole.rows[0]?.role === 'contractor') {
                        relationshipType = 'preferred_contractor';
                    } else if (senderRole.rows[0]?.role === 'contractor' && receiverRole.rows[0]?.role === 'worker') {
                        relationshipType = 'preferred_worker';
                    }

                    // Create the team member relationship (trigger will create bidirectional)
                    await pool.query(`
                        INSERT INTO team_members (user_id, team_member_id, relationship_type, formed_from_request_id)
                        VALUES ($1, $2, $3, $4)
                        ON CONFLICT (user_id, team_member_id) DO NOTHING
                    `, [request.receiver_id, request.sender_id, relationshipType, requestId]);
                }

                await pool.query('COMMIT');

                res.json({
                    success: true,
                    message: `Team request ${status} successfully`,
                    data: { requestId, status }
                });

            } catch (error) {
                await pool.query('ROLLBACK');
                throw error;
            }

        } catch (error) {
            logger.error('Error updating team request:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating team request',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get my team members
    getMyTeam = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const result = await pool.query(`
                SELECT 
                    tm.id as team_member_record_id,
                    tm.team_member_id,
                    tm.relationship_type,
                    tm.created_at as team_since,
                    tm.notes,
                    u.name,
                    u.email,
                    u.role,
                    u.location,
                    CASE 
                        WHEN u.role = 'contractor' THEN cp.company_name
                        WHEN u.role = 'worker' THEN wp.skill_type::text
                        ELSE NULL 
                    END as profile_info,
                    CASE 
                        WHEN u.role = 'contractor' THEN cp.rating
                        WHEN u.role = 'worker' THEN wp.rating
                        ELSE NULL 
                    END as rating,
                    CASE 
                        WHEN u.role = 'contractor' THEN cp.total_projects
                        WHEN u.role = 'worker' THEN wp.total_jobs
                        ELSE 0 
                    END as total_work,
                    CASE 
                        WHEN u.role = 'worker' THEN wp.is_available
                        WHEN u.role = 'contractor' THEN cp.need_worker_status
                        ELSE NULL 
                    END as is_available
                FROM team_members tm
                JOIN users u ON tm.team_member_id = u.id
                LEFT JOIN contractor_profiles cp ON u.id = cp.user_id
                LEFT JOIN worker_profiles wp ON u.id = wp.user_id
                WHERE tm.user_id = $1
                ORDER BY tm.created_at DESC
            `, [req.user.id]);

            res.json({
                success: true,
                message: `Found ${result.rows.length} team members`,
                data: { teamMembers: result.rows }
            });

        } catch (error) {
            logger.error('Error getting team members:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving team members',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Remove team member
    removeTeamMember = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { memberId } = req.params;

            // Start transaction to remove bidirectional relationship
            await pool.query('BEGIN');

            try {
                // Get the team member relationship
                const result = await pool.query(
                    'SELECT team_member_id FROM team_members WHERE id = $1 AND user_id = $2',
                    [memberId, req.user.id]
                );

                if (result.rows.length === 0) {
                    await pool.query('ROLLBACK');
                    res.status(404).json({ success: false, message: 'Team member not found' });
                    return;
                }

                const teamMemberId = result.rows[0].team_member_id;

                // Remove both directions of the relationship
                await pool.query(
                    'DELETE FROM team_members WHERE (user_id = $1 AND team_member_id = $2) OR (user_id = $2 AND team_member_id = $1)',
                    [req.user.id, teamMemberId]
                );

                await pool.query('COMMIT');

                res.json({
                    success: true,
                    message: 'Team member removed successfully'
                });

            } catch (error) {
                await pool.query('ROLLBACK');
                throw error;
            }

        } catch (error) {
            logger.error('Error removing team member:', error);
            res.status(500).json({
                success: false,
                message: 'Error removing team member',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}