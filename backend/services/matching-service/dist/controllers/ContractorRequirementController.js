"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractorRequirementController = void 0;
const db_1 = require("../utils/db");
const ContractorRequirement_1 = require("../models/ContractorRequirement");
class ContractorRequirementController {
    // POST /api/matching/contractor-requirements
    async createRequirement(req, res) {
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
            const newReq = await (0, ContractorRequirement_1.insertContractorRequirement)(db_1.pool, {
                contractorId,
                requiredWorkers,
                skills,
                location,
                notes
            });
            res.status(201).json({ success: true, data: newReq });
            return;
        }
        catch (err) {
            res.status(500).json({ success: false, message: 'Failed to create requirement', error: err.message });
            return;
        }
    }
    // GET /api/matching/contractor-requirements
    async listRequirements(req, res) {
        try {
            const requirements = await (0, ContractorRequirement_1.getContractorRequirements)(db_1.pool);
            res.json({ success: true, data: requirements });
            return;
        }
        catch (err) {
            res.status(500).json({ success: false, message: 'Failed to fetch requirements', error: err.message });
            return;
        }
    }
}
exports.ContractorRequirementController = ContractorRequirementController;
//# sourceMappingURL=ContractorRequirementController.js.map