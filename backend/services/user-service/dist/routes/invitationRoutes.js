"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InvitationController_1 = require("../controllers/InvitationController");
const InvitationService_1 = require("../domain/services/InvitationService");
const auth_1 = require("../middleware/auth");
const pg_1 = require("pg");
const router = (0, express_1.Router)();
// Lazy initialization of database pool and services
let pool;
let invitationService;
let invitationController;
function getInvitationController() {
    if (!invitationController) {
        // Create pool with environment variables (loaded by this time)
        pool = new pg_1.Pool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
        });
        console.log('[invitationRoutes] Database config:', {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD ? '***' : 'fallback'
        });
        invitationService = new InvitationService_1.InvitationService(pool);
        invitationController = new InvitationController_1.InvitationController(invitationService);
    }
    return invitationController;
}
// Create new invitation (requires authentication)
router.post('/api/invitations', auth_1.authenticateToken, (req, res) => getInvitationController().createInvitation(req, res));
// Get user's invitations with pagination (requires authentication)
router.get('/api/invitations', auth_1.authenticateToken, (req, res) => getInvitationController().getUserInvitations(req, res));
// Get invitation statistics (requires authentication)
router.get('/api/invitations/stats', auth_1.authenticateToken, (req, res) => getInvitationController().getInvitationStats(req, res));
// Validate invitation code (public endpoint - no auth required)
router.get('/api/invitations/:code/validate', (req, res) => getInvitationController().validateInvitation(req, res));
// Mark invitation as registered (called after successful registration - requires auth)
router.post('/api/invitations/:code/register', auth_1.authenticateToken, (req, res) => getInvitationController().markAsRegistered(req, res));
exports.default = router;
//# sourceMappingURL=invitationRoutes.js.map