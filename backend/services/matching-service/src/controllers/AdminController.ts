import { Request, Response } from 'express';
import { validateWeights } from '../utils/validation';
import { logger } from '../utils/logger';
import { buildMatchingModule } from '../hexagon';

export class AdminController {
    private hex = buildMatchingModule();
    getDefaultWeights = async (_req: Request, res: Response): Promise<void> => {
        try {
            const weights = await this.hex.useCases.getWeightConfig.execute();
            res.json({ success: true, message: 'Weight config retrieved', data: weights });
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

            const cleaned: Record<string, number> = {};
            Object.entries(validation.weights).forEach(([k, v]) => {
                if (typeof v === 'number') cleaned[k] = v;
            });
            await this.hex.useCases.updateWeightConfig.execute(cleaned);
            res.json({ success: true, message: 'Default weights updated', data: cleaned });
        } catch (error) {
            logger.error('Error updating default weights', error);
            res.status(500).json({ success: false, message: 'Error updating default weights' });
        }
    };

    invalidateCache = async (_req: Request, res: Response): Promise<void> => {
        // Legacy no-op; cache layer removed with hex migration
        res.json({ success: true, message: 'No cache layer present' });
    };
}

export const adminController = new AdminController();
