import { Request, Response } from 'express';
import crypto from 'crypto';
// Legacy MatchingService import removed during hex migration cleanup
// import { MatchingService } from '../services/MatchingService';
import { buildMatchingModule } from '../hexagon';
import { logger } from '../utils/logger';
import { validateWeights } from '../utils/validation';
import { geocodeLocation } from '../utils/location';
import { pool } from '../utils/db';
import { calculateTeamMemberDistance, formatDistance } from '../utils/distance';

export class MatchingController {
    // Hex module now the sole execution path (legacy service removed)
    private hex = buildMatchingModule();

    // Pagination constants
    private static readonly DEFAULT_PAGE_SIZE = 50;
    private static readonly MAX_PAGE_SIZE = 100;
    private static readonly MIN_PAGE = 1;

    constructor() {
        // Legacy MatchingService instance creation removed
    }

    // Helper: Filter out self-referencing team requests
    private filterSelfRequests(rows: any[], currentUserId: string): any[] {
        return rows.filter(r =>
            r.sender_id !== currentUserId &&
            r.sender_id !== r.receiver_id
        );
    }

    // Helper: Filter out self and invalid team members
    private filterSelfTeamMembers(rows: any[], currentUserId: string): any[] {
        return rows.filter(r =>
            r.team_member_id !== currentUserId &&
            r.user_id !== r.team_member_id &&
            r.team_member_id != null
        );
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

            if (!location || !maxDistance) {
                res.status(400).json({
                    success: false,
                    message: 'location and maxDistance are required'
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
                skills: skillType ? [skillType] : [],
                location: locationCoords,
                maxDistanceKm: criteria.maxDistance,
                page: criteria.page,
                pageSize: criteria.limit
            } as any;
            const workers = await this.hex.useCases.findWorkers.execute(hexCriteria);

            // Map worker fields to match frontend expectations
            const mappedWorkers = workers.map((w: any) => ({
                id: w.id,
                name: w.name || `Worker ${w.id?.slice(-6)}`, // Repository returns 'name' not 'workerName'
                location: w.location,
                distanceKm: w.distanceKm,
                score: w.score,
                rating: w.rating,
                totalJobs: w.totalJobs,
                hourlyRate: w.hourlyRate,
                experienceYears: w.experienceYears,
                bio: w.bio,
                isAvailable: w.isAvailable,
                skills: w.skills || []
            }));

            res.json({
                success: true,
                message: `Found ${mappedWorkers.length} worker matches`,
                data: {
                    matches: mappedWorkers,
                    criteria,
                    totalCount: mappedWorkers.length,
                    page: criteria.page || 1,
                    limit: criteria.limit || mappedWorkers.length,
                    totalPages: 1
                }
            });

        } catch (error) {
            logger.error('Error finding workers:', error);
            res.status(500).json({
                success: false,
                message: 'Error finding worker matches',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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

            // Map contractor fields to match frontend expectations
            const mappedContractors = contractors.map((c: any) => ({
                id: c.id,
                name: c.contractorName || c.companyName || `Contractor ${c.id?.slice(-6)}`,
                company: c.companyName,
                location: c.location,
                distanceKm: c.distanceKm,
                score: c.score,
                rating: c.rating,
                totalProjects: c.totalProjects,
                needWorkerStatus: c.needWorkerStatus,
                email: c.email,
                skills: c.skillsNeeded || []
            }));

            res.json({
                success: true,
                message: `Found ${mappedContractors.length} contractor matches`,
                data: {
                    matches: mappedContractors,
                    criteria,
                    totalCount: mappedContractors.length,
                    page: criteria.page || 1,
                    limit: criteria.limit || mappedContractors.length,
                    totalPages: 1
                }
            });

        } catch (error) {
            logger.error('Error finding contractors:', error);
            res.status(500).json({
                success: false,
                message: 'Error finding contractor matches',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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

            // Validate receiverId format (UUID)
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!receiverId || !uuidRegex.test(receiverId)) {
                res.status(400).json({ success: false, message: 'Invalid receiver ID format' });
                return;
            }

            // Validate message length
            if (message && message.length > 1000) {
                res.status(400).json({ success: false, message: 'Message too long (max 1000 characters)' });
                return;
            }

            // Check if user is trying to send request to themselves
            if (senderId === receiverId) {
                res.status(400).json({ success: false, message: 'Cannot send team request to yourself' });
                return;
            }

            // ✅ FIX: Validate that sender and receiver have opposite roles
            const senderRoleResult = await pool.query('SELECT role FROM users WHERE id = $1', [senderId]);
            const receiverRoleResult = await pool.query('SELECT role FROM users WHERE id = $1', [receiverId]);

            if (senderRoleResult.rows.length === 0) {
                res.status(404).json({ success: false, message: 'Sender user not found' });
                return;
            }

            if (receiverRoleResult.rows.length === 0) {
                res.status(404).json({ success: false, message: 'Receiver user not found' });
                return;
            }

            const senderRole = senderRoleResult.rows[0].role;
            const receiverRole = receiverRoleResult.rows[0].role;

            // Contractors can only send requests to workers, and vice versa
            if (senderRole === receiverRole) {
                if (senderRole === 'contractor') {
                    res.status(400).json({
                        success: false,
                        message: 'Contractors can only send team requests to workers, not other contractors'
                    });
                } else if (senderRole === 'worker') {
                    res.status(400).json({
                        success: false,
                        message: 'Workers can only send team requests to contractors, not other workers'
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Cannot send team request to users with the same role'
                    });
                }
                return;
            }

            // Check if either user has blocked the other
            const blockCheck = await pool.query(`
                SELECT blocker_id FROM user_blocks 
                WHERE (blocker_id = $1 AND blocked_id = $2) OR (blocker_id = $2 AND blocked_id = $1)
            `, [senderId, receiverId]);

            if (blockCheck.rows.length > 0) {
                const blockerIsCurrentUser = blockCheck.rows[0].blocker_id === senderId;
                if (blockerIsCurrentUser) {
                    res.status(400).json({ success: false, message: 'Cannot send team request to a user you have blocked' });
                } else {
                    res.status(400).json({ success: false, message: 'Cannot send team request - user is not accepting requests from you' });
                }
                return;
            }

            // Check if request already exists
            const existingRequest = await pool.query(
                'SELECT id, status FROM team_requests WHERE sender_id = $1 AND receiver_id = $2',
                [senderId, receiverId]
            );

            let result;
            if (existingRequest.rows.length > 0) {
                const existing = existingRequest.rows[0];
                if (existing.status === 'pending') {
                    res.status(400).json({ success: false, message: 'Team request already pending' });
                    return;
                } else if (existing.status === 'accepted') {
                    res.status(400).json({ success: false, message: 'Already team members' });
                    return;
                } else {
                    // Status is 'rejected' or 'cancelled' - update to pending
                    result = await pool.query(`
                        UPDATE team_requests 
                        SET message = $3, match_context = $4, status = 'pending', 
                            created_at = CURRENT_TIMESTAMP, 
                            expires_at = CURRENT_TIMESTAMP + INTERVAL '30 days',
                            updated_at = CURRENT_TIMESTAMP
                        WHERE id = $5
                        RETURNING id, created_at
                    `, [senderId, receiverId, message || null, JSON.stringify(matchContext || {}), existing.id]);
                }
            } else {
                // No existing request - create new one
                result = await pool.query(`
                    INSERT INTO team_requests (sender_id, receiver_id, message, match_context, status)
                    VALUES ($1, $2, $3, $4, 'pending')
                    RETURNING id, created_at
                `, [senderId, receiverId, message || null, JSON.stringify(matchContext || {})]);
            }

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
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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

            // Pagination support
            const page = Math.max(MatchingController.MIN_PAGE, parseInt(req.query.page as string) || MatchingController.MIN_PAGE);
            const limit = Math.min(MatchingController.MAX_PAGE_SIZE, Math.max(1, parseInt(req.query.limit as string) || MatchingController.DEFAULT_PAGE_SIZE));
            const offset = (page - 1) * limit;

            logger.info(`Fetching received team requests for user: ${req.user.id} (page: ${page}, limit: ${limit})`);

            const result = await pool.query(`
                SELECT 
                    tr.id,
                    tr.sender_id,
                    tr.receiver_id,
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
                LEFT JOIN user_blocks ub ON (
                    (ub.blocker_id = $1 AND ub.blocked_id = tr.sender_id) OR 
                    (ub.blocker_id = tr.sender_id AND ub.blocked_id = $1)
                )
                WHERE tr.receiver_id = $1 
                AND tr.sender_id != $1
                AND tr.sender_id IS NOT NULL
                AND tr.receiver_id IS NOT NULL
                AND tr.status = 'pending'
                AND tr.expires_at > CURRENT_TIMESTAMP
                AND ub.id IS NULL
                ORDER BY tr.created_at DESC
                LIMIT $2 OFFSET $3
            `, [req.user.id, limit, offset]);

            logger.info(`Raw query returned ${result.rows.length} requests for user ${req.user.id}`);
            logger.info(`Request details:`, JSON.stringify(result.rows.map(r => ({
                request_id: r.id,
                sender: r.sender_id,
                receiver: r.receiver_id,
                sender_name: r.sender_name,
                are_equal: r.sender_id === r.receiver_id,
                sender_equals_user: r.sender_id === req.user?.id,
                receiver_equals_user: r.receiver_id === req.user?.id
            })), null, 2));

            // Extra safety: filter out any requests where sender equals current user
            const currentUserId = req.user.id;
            const filteredRows = this.filterSelfRequests(result.rows, currentUserId);

            logger.info(`After filtering: ${filteredRows.length} requests remain`);

            res.json({
                success: true,
                message: `Found ${filteredRows.length} pending team requests`,
                data: {
                    requests: filteredRows,
                    pagination: {
                        page,
                        limit,
                        total: filteredRows.length,
                        hasMore: filteredRows.length === limit
                    }
                }
            });

        } catch (error) {
            logger.error('Error getting received team requests:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving team requests',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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

                    // ✅ FIX: Additional validation to prevent same-role team members
                    if (senderRole.rows.length === 0 || receiverRole.rows.length === 0) {
                        await pool.query('ROLLBACK');
                        res.status(404).json({ success: false, message: 'User not found' });
                        return;
                    }

                    const senderRoleValue = senderRole.rows[0].role;
                    const receiverRoleValue = receiverRole.rows[0].role;

                    // Prevent contractors from teaming with contractors, workers with workers
                    if (senderRoleValue === receiverRoleValue) {
                        await pool.query('ROLLBACK');
                        if (senderRoleValue === 'contractor') {
                            res.status(400).json({
                                success: false,
                                message: 'Cannot accept team request: Contractors can only team with workers'
                            });
                        } else if (senderRoleValue === 'worker') {
                            res.status(400).json({
                                success: false,
                                message: 'Cannot accept team request: Workers can only team with contractors'
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                message: 'Cannot accept team request: Users must have opposite roles'
                            });
                        }
                        return;
                    }

                    let senderRelationType = 'teammate';
                    let receiverRelationType = 'teammate';

                    if (senderRoleValue === 'worker' && receiverRoleValue === 'contractor') {
                        senderRelationType = 'preferred_contractor';
                        receiverRelationType = 'preferred_worker';
                    } else if (senderRoleValue === 'contractor' && receiverRoleValue === 'worker') {
                        senderRelationType = 'preferred_worker';
                        receiverRelationType = 'preferred_contractor';
                    }

                    // Check if relationship already exists before inserting
                    const existingReceiver = await pool.query(
                        'SELECT id FROM team_members WHERE user_id = $1 AND team_member_id = $2',
                        [request.receiver_id, request.sender_id]
                    );

                    if (existingReceiver.rows.length === 0) {
                        // Receiver sees sender in their team
                        await pool.query(`
                            INSERT INTO team_members (user_id, team_member_id, relationship_type, formed_from_request_id)
                            VALUES ($1, $2, $3, $4)
                        `, [request.receiver_id, request.sender_id, receiverRelationType, requestId]);
                    }

                    const existingSender = await pool.query(
                        'SELECT id FROM team_members WHERE user_id = $1 AND team_member_id = $2',
                        [request.sender_id, request.receiver_id]
                    );

                    if (existingSender.rows.length === 0) {
                        // Sender sees receiver in their team
                        await pool.query(`
                            INSERT INTO team_members (user_id, team_member_id, relationship_type, formed_from_request_id)
                            VALUES ($1, $2, $3, $4)
                        `, [request.sender_id, request.receiver_id, senderRelationType, requestId]);
                    }
                }

                await pool.query('COMMIT');

                res.json({
                    success: true,
                    message: `Team request ${status} successfully`,
                    data: { requestId, status }
                });

            } catch (error) {
                try {
                    await pool.query('ROLLBACK');
                } catch (rollbackError) {
                    logger.error('Error rolling back transaction in updateTeamRequest:', rollbackError);
                }
                throw error;
            }

        } catch (error) {
            logger.error('Error updating team request:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating team request',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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

            // Pagination support
            const page = Math.max(MatchingController.MIN_PAGE, parseInt(req.query.page as string) || MatchingController.MIN_PAGE);
            const limit = Math.min(MatchingController.MAX_PAGE_SIZE, Math.max(1, parseInt(req.query.limit as string) || MatchingController.DEFAULT_PAGE_SIZE));
            const offset = (page - 1) * limit;

            logger.info(`Fetching team members for user: ${req.user.id} (page: ${page}, limit: ${limit})`);

            const result = await pool.query(`
                SELECT 
                    tm.id as team_member_record_id,
                    tm.user_id,
                    tm.team_member_id,
                    tm.relationship_type,
                    tm.created_at as team_since,
                    tm.notes,
                    u.name,
                    u.email,
                    u.phone,
                    u.role,
                    u.location,
                    u.latitude,
                    u.longitude,
                    u.last_location_update,
                    u.location_accuracy,
                    u.location_source,
                    u.is_location_tracking_active,
                    EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - u.last_location_update))/60 as minutes_since_location_update,
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
                LEFT JOIN user_blocks ub ON (
                    (ub.blocker_id = $1 AND ub.blocked_id = tm.team_member_id) OR 
                    (ub.blocker_id = tm.team_member_id AND ub.blocked_id = $1)
                )
                WHERE tm.user_id = $1 
                    AND tm.team_member_id != $1
                    AND tm.team_member_id IS NOT NULL
                    AND ub.id IS NULL
                ORDER BY tm.created_at DESC
                LIMIT $2 OFFSET $3
            `, [req.user.id, limit, offset]);

            logger.info(`Raw query returned ${result.rows.length} team members for user ${req.user.id}`);
            logger.info(`Team member details:`, JSON.stringify(result.rows.map(r => ({
                record_id: r.team_member_record_id,
                user_id: r.user_id,
                team_member_id: r.team_member_id,
                name: r.name,
                is_self: r.team_member_id === req.user?.id,
                user_equals_member: r.user_id === r.team_member_id
            })), null, 2));

            // Get total count for pagination
            const countResult = await pool.query(`
                SELECT COUNT(*) as total
                FROM team_members tm
                LEFT JOIN user_blocks ub ON (
                    (ub.blocker_id = $1 AND ub.blocked_id = tm.team_member_id)
                    OR (ub.blocker_id = tm.team_member_id AND ub.blocked_id = $1)
                )
                WHERE tm.user_id = $1 
                    AND tm.team_member_id != $1
                    AND tm.team_member_id IS NOT NULL
                    AND ub.id IS NULL
            `, [req.user.id]);
            const total = parseInt(countResult.rows[0].total);

            // Extra safety: filter out yourself and any invalid entries
            const currentUserId = req.user.id;
            const filteredRows = this.filterSelfTeamMembers(result.rows, currentUserId);

            logger.info(`After filtering: ${filteredRows.length} team members remain`);

            // Get current user's coordinates for distance calculation
            const userCoords = await pool.query(
                'SELECT latitude, longitude FROM users WHERE id = $1',
                [req.user.id]
            );
            const currentUserLocation = userCoords.rows[0] || null;

            // Calculate distance and live status for each team member
            const teamMembersWithDistance = filteredRows.map((member: any) => {
                const distance = calculateTeamMemberDistance(
                    currentUserLocation,
                    { latitude: member.latitude, longitude: member.longitude }
                );

                // Determine location status
                const minutesSinceUpdate = member.minutes_since_location_update;
                let locationStatus = 'unknown';
                let locationStatusText = 'Location not updated';

                if (member.last_location_update) {
                    if (minutesSinceUpdate < 2) {
                        locationStatus = 'live';
                        locationStatusText = 'Live Now 🟢';
                    } else if (minutesSinceUpdate < 5) {
                        locationStatus = 'recent';
                        locationStatusText = `${Math.floor(minutesSinceUpdate)} min ago`;
                    } else if (minutesSinceUpdate < 60) {
                        locationStatus = 'stale';
                        locationStatusText = `${Math.floor(minutesSinceUpdate)} min ago`;
                    } else if (minutesSinceUpdate < 1440) { // < 24 hours
                        const hours = Math.floor(minutesSinceUpdate / 60);
                        locationStatus = 'old';
                        locationStatusText = `${hours}h ago`;
                    } else {
                        const days = Math.floor(minutesSinceUpdate / 1440);
                        locationStatus = 'very_old';
                        locationStatusText = `${days}d ago`;
                    }
                }

                return {
                    ...member,
                    distance_km: distance,
                    distance_formatted: distance ? formatDistance(distance) : null,
                    location_status: locationStatus,
                    location_status_text: locationStatusText,
                    is_tracking_live: member.is_location_tracking_active || false,
                    location_last_update: member.last_location_update
                };
            });

            res.json({
                success: true,
                message: `Found ${filteredRows.length} team members`,
                data: {
                    teamMembers: teamMembersWithDistance,
                    pagination: {
                        page,
                        limit,
                        total,
                        hasMore: page * limit < total
                    },
                    currentUserLocation: currentUserLocation ? {
                        latitude: currentUserLocation.latitude,
                        longitude: currentUserLocation.longitude
                    } : null
                }
            });

        } catch (error) {
            logger.error('Error getting team members:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving team members',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
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
                try {
                    await pool.query('ROLLBACK');
                } catch (rollbackError) {
                    logger.error('Error rolling back transaction in removeTeamMember:', rollbackError);
                }
                throw error;
            }

        } catch (error) {
            logger.error('Error removing team member:', error);
            res.status(500).json({
                success: false,
                message: 'Error removing team member',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    // Block a user
    blockUser = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { blockedUserId, reason } = req.body;

            // Validate input
            if (!blockedUserId) {
                res.status(400).json({ success: false, message: 'blockedUserId is required' });
                return;
            }

            // Check if user is trying to block themselves
            if (req.user.id === blockedUserId) {
                res.status(400).json({ success: false, message: 'Cannot block yourself' });
                return;
            }

            // Check if user exists
            const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [blockedUserId]);
            if (userCheck.rows.length === 0) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }

            // Insert block relationship (or update if exists)
            await pool.query(`
                INSERT INTO user_blocks (blocker_id, blocked_id, reason)
                VALUES ($1, $2, $3)
                ON CONFLICT (blocker_id, blocked_id) 
                DO UPDATE SET reason = EXCLUDED.reason, created_at = CURRENT_TIMESTAMP
            `, [req.user.id, blockedUserId, reason || null]);

            logger.info(`User ${req.user.id} blocked user ${blockedUserId}`);

            res.json({
                success: true,
                message: 'User blocked successfully',
                data: { blockedUserId, reason }
            });

        } catch (error) {
            logger.error('Error blocking user:', error);
            res.status(500).json({
                success: false,
                message: 'Error blocking user',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    // Unblock a user
    unblockUser = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { blockedUserId } = req.body;

            // Validate input
            if (!blockedUserId) {
                res.status(400).json({ success: false, message: 'blockedUserId is required' });
                return;
            }

            // Remove block relationship
            const result = await pool.query(
                'DELETE FROM user_blocks WHERE blocker_id = $1 AND blocked_id = $2',
                [req.user.id, blockedUserId]
            );

            if (result.rowCount === 0) {
                res.status(404).json({ success: false, message: 'Block relationship not found' });
                return;
            }

            logger.info(`User ${req.user.id} unblocked user ${blockedUserId}`);

            res.json({
                success: true,
                message: 'User unblocked successfully',
                data: { blockedUserId }
            });

        } catch (error) {
            logger.error('Error unblocking user:', error);
            res.status(500).json({
                success: false,
                message: 'Error unblocking user',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    // Get blocked users list
    getBlockedUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const result = await pool.query(`
                SELECT 
                    ub.id as block_id,
                    ub.blocked_id,
                    ub.reason,
                    ub.created_at as blocked_at,
                    u.name as blocked_user_name,
                    u.email as blocked_user_email,
                    u.role as blocked_user_role
                FROM user_blocks ub
                JOIN users u ON ub.blocked_id = u.id
                WHERE ub.blocker_id = $1
                ORDER BY ub.created_at DESC
            `, [req.user.id]);

            res.json({
                success: true,
                message: `Found ${result.rows.length} blocked users`,
                data: { blockedUsers: result.rows }
            });

        } catch (error) {
            logger.error('Error getting blocked users:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving blocked users',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    // Check if a user is blocked
    checkBlockStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { userId } = req.params;

            const result = await pool.query(
                'SELECT id FROM user_blocks WHERE blocker_id = $1 AND blocked_id = $2',
                [req.user.id, userId]
            );

            res.json({
                success: true,
                data: {
                    isBlocked: result.rows.length > 0,
                    userId
                }
            });

        } catch (error) {
            logger.error('Error checking block status:', error);
            res.status(500).json({
                success: false,
                message: 'Error checking block status',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    // Contact a contractor (send team request/message)
    contactContractor = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { contractorId, message } = req.body;

            if (!contractorId) {
                res.status(400).json({ success: false, message: 'contractorId is required' });
                return;
            }

            // Create a team request as the contact mechanism
            const result = await pool.query(
                `INSERT INTO team_requests (sender_id, receiver_id, message, status, created_at)
                 VALUES ($1, $2, $3, 'pending', NOW())
                 RETURNING id, sender_id, receiver_id, message, status, created_at`,
                [req.user.id, contractorId, message || 'Contact request']
            );

            logger.info(`Contact request sent from user ${req.user.id} to contractor ${contractorId}`);

            res.json({
                success: true,
                message: 'Contact request sent successfully',
                data: { teamRequest: result.rows[0] }
            });

        } catch (error) {
            logger.error('Error sending contact request:', error);
            res.status(500).json({
                success: false,
                message: 'Error sending contact request',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    // Update user location (for live tracking)
    updateLocation = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { latitude, longitude, location } = req.body;

            // Validate coordinates
            if (latitude === undefined || longitude === undefined) {
                res.status(400).json({ success: false, message: 'latitude and longitude are required' });
                return;
            }

            if (typeof latitude !== 'number' || typeof longitude !== 'number') {
                res.status(400).json({ success: false, message: 'latitude and longitude must be numbers' });
                return;
            }

            if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
                res.status(400).json({ success: false, message: 'Invalid coordinates range' });
                return;
            }

            // Update user location
            const result = await pool.query(
                `UPDATE users 
                 SET latitude = $1, longitude = $2, location = COALESCE($3, location), updated_at = CURRENT_TIMESTAMP
                 WHERE id = $4
                 RETURNING id, latitude, longitude, location`,
                [latitude, longitude, location, req.user.id]
            );

            if (result.rows.length === 0) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }

            logger.info(`Location updated for user ${req.user.id}: ${latitude}, ${longitude}`);

            res.json({
                success: true,
                message: 'Location updated successfully',
                data: {
                    latitude: result.rows[0].latitude,
                    longitude: result.rows[0].longitude,
                    location: result.rows[0].location
                }
            });

        } catch (error) {
            logger.error('Error updating location:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating location',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    /**
     * Update location with real-time GPS tracking metadata
     * POST /api/matching/update-location-live
     * Body: { latitude, longitude, accuracy?, source?, location? }
     * 
     * This endpoint is optimized for frequent GPS updates:
     * - Updates location with timestamp
     * - Stores GPS accuracy
     * - Tracks location source (gps/network/cell)
     * - Marks user as actively tracking
     */
    updateLocationLive = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { latitude, longitude, accuracy, source = 'gps', location } = req.body;

            // Validate coordinates
            if (latitude === undefined || longitude === undefined) {
                res.status(400).json({ success: false, message: 'latitude and longitude are required' });
                return;
            }

            if (typeof latitude !== 'number' || typeof longitude !== 'number') {
                res.status(400).json({ success: false, message: 'latitude and longitude must be numbers' });
                return;
            }

            if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
                res.status(400).json({ success: false, message: 'Invalid coordinates range' });
                return;
            }

            // Validate accuracy if provided
            if (accuracy !== undefined && (typeof accuracy !== 'number' || accuracy < 0)) {
                res.status(400).json({ success: false, message: 'accuracy must be a positive number' });
                return;
            }

            // Validate source
            const validSources = ['gps', 'manual', 'network', 'cell'];
            if (!validSources.includes(source)) {
                res.status(400).json({
                    success: false,
                    message: `source must be one of: ${validSources.join(', ')}`
                });
                return;
            }

            // Update user location with tracking metadata
            const result = await pool.query(
                `UPDATE users 
                 SET 
                    latitude = $1, 
                    longitude = $2, 
                    location = COALESCE($3, location),
                    location_accuracy = $4,
                    location_source = $5,
                    last_location_update = CURRENT_TIMESTAMP,
                    is_location_tracking_active = true,
                    updated_at = CURRENT_TIMESTAMP
                 WHERE id = $6
                 RETURNING 
                    id, 
                    latitude, 
                    longitude, 
                    location, 
                    location_accuracy, 
                    location_source,
                    last_location_update,
                    is_location_tracking_active`,
                [latitude, longitude, location, accuracy, source, req.user.id]
            );

            if (result.rows.length === 0) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }

            // Also save to location_history for tracking trail
            try {
                await pool.query(
                    `INSERT INTO location_history (user_id, latitude, longitude, accuracy, source, recorded_at)
                     VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)`,
                    [req.user.id, latitude, longitude, accuracy || null, source]
                );
                logger.info(`Location history saved for user ${req.user.id} (GPS tracking)`);
            } catch (historyError) {
                // Don't fail the request if history insert fails, just log it
                logger.warn(`Failed to save location history for user ${req.user.id}:`, historyError);
            }

            logger.info(`Live location updated for user ${req.user.id}: ${latitude}, ${longitude} (accuracy: ${accuracy}m, source: ${source})`);

            res.json({
                success: true,
                message: 'Live location updated successfully',
                data: {
                    latitude: result.rows[0].latitude,
                    longitude: result.rows[0].longitude,
                    location: result.rows[0].location,
                    accuracy: result.rows[0].location_accuracy,
                    source: result.rows[0].location_source,
                    lastUpdate: result.rows[0].last_location_update,
                    isTracking: result.rows[0].is_location_tracking_active
                }
            });

        } catch (error) {
            logger.error('Error updating live location:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating live location',
                ...(process.env.NODE_ENV === 'development' && {
                    error: error instanceof Error ? error.message : 'Unknown error'
                })
            });
        }
    };

    /**
     * Stop GPS tracking for current user
     * POST /api/matching/stop-location-tracking
     */
    stopLocationTracking = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            await pool.query(
                `UPDATE users 
                 SET is_location_tracking_active = false, updated_at = CURRENT_TIMESTAMP
                 WHERE id = $1`,
                [req.user.id]
            );

            logger.info(`Location tracking stopped for user ${req.user.id}`);

            res.json({
                success: true,
                message: 'Location tracking stopped'
            });

        } catch (error) {
            logger.error('Error stopping location tracking:', error);
            res.status(500).json({
                success: false,
                message: 'Error stopping location tracking'
            });
        }
    };
}