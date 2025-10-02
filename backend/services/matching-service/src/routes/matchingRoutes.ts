import { Router } from 'express';
let buildHealthPayload: any;
try {
    ({ buildHealthPayload } = require('../../../shared/src/health'));
} catch {
    buildHealthPayload = (service: string, version?: string, domain?: any) => ({
        status: 'ok',
        service,
        version: version || (process as any).env.npm_package_version || 'unknown',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    });
}
import { MatchingController } from '../controllers/MatchingController';
import { ContractorRequirementController } from '../controllers/ContractorRequirementController';
import { validate } from '../../../shared';
import { z } from 'zod';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();
const matchingController = new MatchingController();
const contractorRequirementController = new ContractorRequirementController();

// Health check
router.get('/health', (_req, res) => {
    res.json(buildHealthPayload('matching-service'));
});

// Matching endpoints - Temporarily removing auth for testing
const findWorkersBody = z.object({
    skillType: z.string().min(1).optional(), // legacy single skill field used in tests
    skills: z.array(z.string()).optional(),
    location: z.string().optional(),
    maxDistance: z.number().int().positive().optional(),
    budgetRange: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
    limit: z.number().int().positive().max(100).optional()
});
router.post('/api/matching/find-workers',
    authenticateToken,
    requireRole(['contractor']),
    validate({ schema: findWorkersBody }),
    matchingController.findWorkers
);

const findContractorsBody = z.object({
    skillType: z.string().min(1).optional(),
    skills: z.array(z.string()).optional(),
    location: z.string().optional(),
    maxDistance: z.number().int().positive().optional(),
    budgetRange: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
    limit: z.number().int().positive().max(100).optional()
});
router.post('/api/matching/find-contractors',
    authenticateToken,
    requireRole(['worker']),
    validate({ schema: findContractorsBody }),
    matchingController.findContractors
);

// Match preferences
router.get('/api/matching/preferences',
    authenticateToken,
    matchingController.getMatchPreferences
);

const updatePreferencesBody = z.object({
    preferences: z.record(z.any()).optional(),
    visibility: z.enum(['public', 'private']).optional()
});
router.put('/api/matching/preferences',
    authenticateToken,
    validate({ schema: updatePreferencesBody }),
    matchingController.updateMatchPreferences
);

// Saved matches
const saveMatchBody = z.object({
    matchId: z.string().min(1),
    notes: z.string().max(1000).optional()
});
router.post('/api/matching/save-match',
    authenticateToken,
    validate({ schema: saveMatchBody }),
    matchingController.saveMatch
);

router.get('/api/matching/saved-matches',
    authenticateToken,
    matchingController.getSavedMatches
);

router.delete('/api/matching/saved-matches/:matchId',
    authenticateToken,
    matchingController.deleteSavedMatch
);

// Team requests
const sendTeamRequestBody = z.object({
    receiverId: z.string().uuid(),
    message: z.string().max(500).optional(),
    matchContext: z.object({
        skill: z.string().optional(),
        distance: z.string().optional(),
        matchScore: z.number().optional(),
        searchType: z.string().optional() // 'worker' or 'contractor'
    }).optional()
});
router.post('/api/matching/send-team-request',
    authenticateToken,
    validate({ schema: sendTeamRequestBody }),
    matchingController.sendTeamRequest
);

router.get('/api/matching/team-requests/received',
    authenticateToken,
    matchingController.getReceivedTeamRequests
);

router.get('/api/matching/team-requests/sent',
    authenticateToken,
    matchingController.getSentTeamRequests
);

const updateTeamRequestBody = z.object({
    status: z.enum(['accepted', 'rejected'])
});
router.put('/api/matching/team-requests/:requestId',
    authenticateToken,
    validate({ schema: updateTeamRequestBody }),
    matchingController.updateTeamRequest
);

router.get('/api/matching/my-team',
    authenticateToken,
    matchingController.getMyTeam
);

router.delete('/api/matching/team-members/:memberId',
    authenticateToken,
    matchingController.removeTeamMember
);

// Statistics (could be restricted to admin users)
router.get('/api/matching/stats',
    authenticateToken,
    matchingController.getMatchingStats
);

// User blocking functionality
const blockUserBody = z.object({
    blockedUserId: z.string().uuid(),
    reason: z.enum(['harassment', 'unprofessional', 'spam', 'other']).optional()
});

const unblockUserBody = z.object({
    blockedUserId: z.string().uuid()
});

router.post('/api/matching/block-user',
    authenticateToken,
    validate({ schema: blockUserBody }),
    matchingController.blockUser
);

router.post('/api/matching/unblock-user',
    authenticateToken,
    validate({ schema: unblockUserBody }),
    matchingController.unblockUser
);

router.get('/api/matching/blocked-users',
    authenticateToken,
    matchingController.getBlockedUsers
);

router.get('/api/matching/block-status/:userId',
    authenticateToken,
    matchingController.checkBlockStatus
);

// Contractor requirements
const contractorRequirementBody = z.object({
    requiredWorkers: z.number().int().min(1),
    skills: z.array(z.string()).optional(),
    location: z.string().optional(),
    notes: z.string().optional()
});

// Contractor submits a requirement
router.post('/api/matching/contractor-requirements',
    authenticateToken,
    requireRole(['contractor']),
    validate({ schema: contractorRequirementBody }),
    (req, res) => contractorRequirementController.createRequirement(req, res)
);

// Worker/anyone fetches all requirements
router.get('/api/matching/contractor-requirements',
    authenticateToken,
    (req, res) => contractorRequirementController.listRequirements(req, res)
);

export default router;