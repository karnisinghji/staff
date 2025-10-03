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
const ContractorRequirementController_1 = require("../controllers/ContractorRequirementController");
const shared_1 = require("../../../shared");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const matchingController = new MatchingController_1.MatchingController();
const contractorRequirementController = new ContractorRequirementController_1.ContractorRequirementController();
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
// Team requests
const sendTeamRequestBody = zod_1.z.object({
    receiverId: zod_1.z.string().uuid(),
    message: zod_1.z.string().max(500).optional(),
    matchContext: zod_1.z.object({
        skill: zod_1.z.string().optional(),
        distance: zod_1.z.string().optional(),
        matchScore: zod_1.z.number().optional(),
        searchType: zod_1.z.string().optional() // 'worker' or 'contractor'
    }).optional()
});
router.post('/api/matching/send-team-request', auth_1.authenticateToken, (0, shared_1.validate)({ schema: sendTeamRequestBody }), matchingController.sendTeamRequest);
router.get('/api/matching/team-requests/received', auth_1.authenticateToken, matchingController.getReceivedTeamRequests);
router.get('/api/matching/team-requests/sent', auth_1.authenticateToken, matchingController.getSentTeamRequests);
const updateTeamRequestBody = zod_1.z.object({
    status: zod_1.z.enum(['accepted', 'rejected'])
});
router.put('/api/matching/team-requests/:requestId', auth_1.authenticateToken, (0, shared_1.validate)({ schema: updateTeamRequestBody }), matchingController.updateTeamRequest);
router.get('/api/matching/my-team', auth_1.authenticateToken, matchingController.getMyTeam);
router.delete('/api/matching/team-members/:memberId', auth_1.authenticateToken, matchingController.removeTeamMember);
// Statistics (could be restricted to admin users)
router.get('/api/matching/stats', auth_1.authenticateToken, matchingController.getMatchingStats);
// User blocking functionality
const blockUserBody = zod_1.z.object({
    blockedUserId: zod_1.z.string().uuid(),
    reason: zod_1.z.enum(['harassment', 'unprofessional', 'spam', 'other']).optional()
});
const unblockUserBody = zod_1.z.object({
    blockedUserId: zod_1.z.string().uuid()
});
router.post('/api/matching/block-user', auth_1.authenticateToken, (0, shared_1.validate)({ schema: blockUserBody }), matchingController.blockUser);
router.post('/api/matching/unblock-user', auth_1.authenticateToken, (0, shared_1.validate)({ schema: unblockUserBody }), matchingController.unblockUser);
router.get('/api/matching/blocked-users', auth_1.authenticateToken, matchingController.getBlockedUsers);
router.get('/api/matching/block-status/:userId', auth_1.authenticateToken, matchingController.checkBlockStatus);
// Contractor requirements
const contractorRequirementBody = zod_1.z.object({
    requiredWorkers: zod_1.z.number().int().min(1),
    skills: zod_1.z.array(zod_1.z.string()).optional(),
    location: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional()
});
// Contractor submits a requirement
router.post('/api/matching/contractor-requirements', auth_1.authenticateToken, (0, auth_1.requireRole)(['contractor']), (0, shared_1.validate)({ schema: contractorRequirementBody }), (req, res) => contractorRequirementController.createRequirement(req, res));
// Worker/anyone fetches all requirements
router.get('/api/matching/contractor-requirements', auth_1.authenticateToken, (req, res) => contractorRequirementController.listRequirements(req, res));
exports.default = router;
//# sourceMappingURL=matchingRoutes.js.map