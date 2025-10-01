import { Request, Response } from 'express';
import { adminService } from '../services/AdminService';
import { validateWeights } from '../utils/validation';
import { logger } from '../utils/logger';

export class AdminController {
    getDefaultWeights = async (_req: Request, res: Response): Promise<void> => {
        try {
            const weights = await adminService.getDefaultWeights();
            res.json({ success: true, message: 'Default weights retrieved', data: weights });
        } catch (error) {
            logger.error('Error getting default weights', error);
            res.status(500).json({ success: false, message: 'Error retrieving default weights' });
        }
    };

    updateDefaultWeights = async (req: Request, res: Response): Promise<void> => {
        try {
            const { weights } = req.body;
            const validation = validateWeights(weights);
            if (!validation.ok || !validation.weights) {
                res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                return;
            }

            const updated = await adminService.updateDefaultWeights(validation.weights);
            res.json({ success: true, message: 'Default weights updated', data: updated });
        } catch (error) {
            logger.error('Error updating default weights', error);
            res.status(500).json({ success: false, message: 'Error updating default weights' });
        }
    };

    invalidateCache = async (_req: Request, res: Response): Promise<void> => {
        try {
            // Clear cache in the admin service instance
            const svcMod = await import('../services/AdminService');
            if (svcMod && svcMod.adminService && typeof svcMod.adminService.clearCache === 'function') {
                svcMod.adminService.clearCache();
                res.json({ success: true, message: 'Admin cache invalidated' });
                return;
            }
            res.status(500).json({ success: false, message: 'Admin cache invalidation not supported' });
        } catch (error) {
            logger.error('Error invalidating admin cache', error);
            res.status(500).json({ success: false, message: 'Error invalidating admin cache' });
        }
    };
}

export const adminController = new AdminController();
