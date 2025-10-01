"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = exports.AdminController = void 0;
const validation_1 = require("../utils/validation");
const logger_1 = require("../utils/logger");
const hexagon_1 = require("../hexagon");
class AdminController {
    constructor() {
        this.hex = (0, hexagon_1.buildMatchingModule)();
        this.getDefaultWeights = async (_req, res) => {
            try {
                const weights = await this.hex.useCases.getWeightConfig.execute();
                res.json({ success: true, message: 'Weight config retrieved', data: weights });
            }
            catch (error) {
                logger_1.logger.error('Error getting default weights', error);
                res.status(500).json({ success: false, message: 'Error retrieving default weights' });
            }
        };
        this.updateDefaultWeights = async (req, res) => {
            try {
                const { weights } = req.body;
                const validation = (0, validation_1.validateWeights)(weights);
                if (!validation.ok || !validation.weights) {
                    res.status(400).json({ success: false, message: 'Invalid weights', error: validation.error });
                    return;
                }
                const cleaned = {};
                Object.entries(validation.weights).forEach(([k, v]) => {
                    if (typeof v === 'number')
                        cleaned[k] = v;
                });
                await this.hex.useCases.updateWeightConfig.execute(cleaned);
                res.json({ success: true, message: 'Default weights updated', data: cleaned });
            }
            catch (error) {
                logger_1.logger.error('Error updating default weights', error);
                res.status(500).json({ success: false, message: 'Error updating default weights' });
            }
        };
        this.invalidateCache = async (_req, res) => {
            // Legacy no-op; cache layer removed with hex migration
            res.json({ success: true, message: 'No cache layer present' });
        };
    }
}
exports.AdminController = AdminController;
exports.adminController = new AdminController();
//# sourceMappingURL=AdminController.js.map