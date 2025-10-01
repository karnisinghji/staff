"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let buildHealthPayload;
try {
    ({ buildHealthPayload } = require('../../../shared/src/health'));
}
catch {
    buildHealthPayload = (service, version, domain) => ({
        status: 'ok',
        service,
        version: version || process.env.npm_package_version || 'unknown',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    });
}
const MatchingController_1 = require("../controllers/MatchingController");
const shared_1 = require("../../../shared");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const matchingController = new MatchingController_1.MatchingController();
// Health check
router.get('/health', (_req, res) => {
    res.json(buildHealthPayload('matching-service'));
});
// Matching endpoints - Temporarily removing auth for testing
const findWorkersBody = zod_1.z.object({
    skillType: zod_1.z.string().min(1).optional(), // legacy single skill field used in tests
    skills: zod_1.z.array(zod_1.z.string()).optional(),
    location: zod_1.z.string().optional(),
    maxDistance: zod_1.z.number().int().positive().optional(),
    budgetRange: zod_1.z.object({ min: zod_1.z.number().optional(), max: zod_1.z.number().optional() }).optional(),
    limit: zod_1.z.number().int().positive().max(100).optional()
});
router.post('/api/matching/find-workers', auth_1.authenticateToken, (0, auth_1.requireRole)(['contractor']), (0, shared_1.validate)({ schema: findWorkersBody }), matchingController.findWorkers);
const findContractorsBody = zod_1.z.object({
    skillType: zod_1.z.string().min(1).optional(),
    skills: zod_1.z.array(zod_1.z.string()).optional(),
    location: zod_1.z.string().optional(),
    maxDistance: zod_1.z.number().int().positive().optional(),
    budgetRange: zod_1.z.object({ min: zod_1.z.number().optional(), max: zod_1.z.number().optional() }).optional(),
    limit: zod_1.z.number().int().positive().max(100).optional()
});
router.post('/api/matching/find-contractors', auth_1.authenticateToken, (0, auth_1.requireRole)(['worker']), (0, shared_1.validate)({ schema: findContractorsBody }), matchingController.findContractors);
// Match preferences
router.get('/api/matching/preferences', auth_1.authenticateToken, matchingController.getMatchPreferences);
const updatePreferencesBody = zod_1.z.object({
    preferences: zod_1.z.record(zod_1.z.any()).optional(),
    visibility: zod_1.z.enum(['public', 'private']).optional()
});
router.put('/api/matching/preferences', auth_1.authenticateToken, (0, shared_1.validate)({ schema: updatePreferencesBody }), matchingController.updateMatchPreferences);
// Saved matches
const saveMatchBody = zod_1.z.object({
    matchId: zod_1.z.string().min(1),
    notes: zod_1.z.string().max(1000).optional()
});
router.post('/api/matching/save-match', auth_1.authenticateToken, (0, shared_1.validate)({ schema: saveMatchBody }), matchingController.saveMatch);
router.get('/api/matching/saved-matches', auth_1.authenticateToken, matchingController.getSavedMatches);
router.delete('/api/matching/saved-matches/:matchId', auth_1.authenticateToken, matchingController.deleteSavedMatch);
// Statistics (could be restricted to admin users)
router.get('/api/matching/stats', auth_1.authenticateToken, matchingController.getMatchingStats);
exports.default = router;
//# sourceMappingURL=matchingRoutes.js.map