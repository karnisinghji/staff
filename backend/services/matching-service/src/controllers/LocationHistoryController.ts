import { Request, Response } from 'express';
import { Pool } from 'pg';
import { logger } from '../utils/logger';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export class LocationHistoryController {
    /**
     * Save a location update to history
     * POST /api/matching/location/history
     * Body: { latitude, longitude, accuracy?, source? }
     */
    saveLocationHistory = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { latitude, longitude, accuracy, source = 'manual' } = req.body;

            if (!latitude || !longitude) {
                res.status(400).json({
                    success: false,
                    message: 'Latitude and longitude are required',
                });
                return;
            }

            // Validate coordinates
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);

            if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid coordinates',
                });
                return;
            }

            // Save to location_history table
            const result = await pool.query(
                `INSERT INTO location_history (user_id, latitude, longitude, accuracy, source, recorded_at)
         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
         RETURNING id, recorded_at`,
                [req.user.id, lat, lng, accuracy || null, source]
            );

            // Also update current location in users table (for backward compatibility)
            await pool.query(
                'UPDATE users SET latitude = $1, longitude = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
                [lat, lng, req.user.id]
            );

            logger.info(`Location history saved for user ${req.user.id} at (${lat}, ${lng})`);

            res.json({
                success: true,
                message: 'Location history saved successfully',
                data: {
                    historyId: result.rows[0].id,
                    recordedAt: result.rows[0].recorded_at,
                },
            });
        } catch (error) {
            logger.error('Error saving location history:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to save location history',
            });
        }
    };

    /**
     * Get location history for current user
     * GET /api/matching/location/history?hours=24&limit=100
     */
    getLocationHistory = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const hours = Math.min(parseInt(req.query.hours as string) || 24, 720); // Max 30 days
            const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000); // Max 1000 records

            const result = await pool.query(
                `SELECT 
          id,
          latitude,
          longitude,
          accuracy,
          location_name,
          source,
          recorded_at
        FROM location_history
        WHERE user_id = $1 
          AND recorded_at >= CURRENT_TIMESTAMP - INTERVAL '${hours} hours'
        ORDER BY recorded_at DESC
        LIMIT $2`,
                [req.user.id, limit]
            );

            res.json({
                success: true,
                message: `Found ${result.rows.length} location records`,
                data: {
                    locations: result.rows,
                    timeRange: {
                        hours,
                        from: new Date(Date.now() - hours * 60 * 60 * 1000).toISOString(),
                        to: new Date().toISOString(),
                    },
                },
            });
        } catch (error) {
            logger.error('Error fetching location history:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch location history',
            });
        }
    };

    /**
     * Get location history for a team member (contractor viewing worker)
     * GET /api/matching/location/history/:teamMemberId?hours=24
     */
    getTeamMemberLocationHistory = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const { teamMemberId } = req.params;
            const hours = Math.min(parseInt(req.query.hours as string) || 24, 168); // Max 7 days for team members
            const limit = Math.min(parseInt(req.query.limit as string) || 50, 500);

            // Verify team relationship exists
            const teamCheck = await pool.query(
                `SELECT id FROM team_members 
         WHERE user_id = $1 AND team_member_id = $2`,
                [req.user.id, teamMemberId]
            );

            if (teamCheck.rows.length === 0) {
                res.status(403).json({
                    success: false,
                    message: 'Not authorized to view this user\'s location history',
                });
                return;
            }

            const result = await pool.query(
                `SELECT 
          id,
          latitude,
          longitude,
          accuracy,
          location_name,
          source,
          recorded_at
        FROM location_history
        WHERE user_id = $1 
          AND recorded_at >= CURRENT_TIMESTAMP - INTERVAL '${hours} hours'
        ORDER BY recorded_at DESC
        LIMIT $2`,
                [teamMemberId, limit]
            );

            res.json({
                success: true,
                message: `Found ${result.rows.length} location records`,
                data: {
                    teamMemberId,
                    locations: result.rows,
                    timeRange: {
                        hours,
                        from: new Date(Date.now() - hours * 60 * 60 * 1000).toISOString(),
                        to: new Date().toISOString(),
                    },
                },
            });
        } catch (error) {
            logger.error('Error fetching team member location history:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch location history',
            });
        }
    };

    /**
     * Delete old location history
     * DELETE /api/matching/location/history?days=30
     * Admin only or automatic cleanup
     */
    cleanupOldHistory = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            const days = parseInt(req.query.days as string) || 30;

            const result = await pool.query(
                `DELETE FROM location_history 
         WHERE user_id = $1 
           AND recorded_at < CURRENT_TIMESTAMP - INTERVAL '${days} days'
         RETURNING id`,
                [req.user.id]
            );

            res.json({
                success: true,
                message: `Deleted ${result.rowCount} old location records`,
                data: {
                    deletedCount: result.rowCount,
                    olderThanDays: days,
                },
            });
        } catch (error) {
            logger.error('Error cleaning up location history:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to cleanup location history',
            });
        }
    };
}
