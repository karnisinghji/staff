import { Request, Response } from 'express';
import { pool } from '../utils/db';
import { insertContractorRequirement, getContractorRequirements } from '../models/ContractorRequirement';

export class ContractorRequirementController {
    // POST /api/matching/contractor-requirements
    async createRequirement(req: Request, res: Response) {
        try {
            const contractorId = req.user?.id;
            if (!contractorId) {
                res.status(401).json({ success: false, message: 'Unauthorized' });
                return;
            }
            const { requiredWorkers, skills, location, notes } = req.body;
            if (!requiredWorkers || requiredWorkers < 1) {
                res.status(400).json({ success: false, message: 'requiredWorkers is required and must be >= 1' });
                return;
            }
            const newReq = await insertContractorRequirement(pool, {
                contractorId,
                requiredWorkers,
                skills,
                location,
                notes
            });
            res.status(201).json({ success: true, data: newReq });
            return;
        } catch (err) {
            res.status(500).json({ success: false, message: 'Failed to create requirement', error: (err as Error).message });
            return;
        }
    }

    // GET /api/matching/contractor-requirements
    async listRequirements(req: Request, res: Response) {
        try {
            const requirements = await getContractorRequirements(pool);
            res.json({ success: true, data: requirements });
            return;
        } catch (err) {
            res.status(500).json({ success: false, message: 'Failed to fetch requirements', error: (err as Error).message });
            return;
        }
    }
}
