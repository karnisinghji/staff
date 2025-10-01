import { Router } from 'express';
import { MatchingController } from '../controllers/MatchingController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();
const matchingController = new MatchingController();

// Health check
router.get('/health', (req, res) => {
    res.json({
        service: 'Matching Service',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// Matching endpoints - Temporarily removing auth for testing
router.post('/api/matching/find-workers',
    authenticateToken,
    requireRole(['contractor']),
    matchingController.findWorkers
);

router.post('/api/matching/find-contractors',
    authenticateToken,
    requireRole(['worker']),
    matchingController.findContractors
);

// Match preferences
router.get('/api/matching/preferences',
    authenticateToken,
    matchingController.getMatchPreferences
);

router.put('/api/matching/preferences',
    authenticateToken,
    matchingController.updateMatchPreferences
);

// Saved matches
router.post('/api/matching/save-match',
    authenticateToken,
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

// Statistics (could be restricted to admin users)
router.get('/api/matching/stats',
    authenticateToken,
    matchingController.getMatchingStats
);

export default router;