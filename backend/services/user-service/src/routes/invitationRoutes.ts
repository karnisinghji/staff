import { Router } from 'express';
import { InvitationController } from '../controllers/InvitationController';
import { InvitationService } from '../domain/services/InvitationService';
import { authenticateToken } from '../middleware/auth';
import { Pool } from 'pg';

const router = Router();

// Lazy initialization of database pool and services
let pool: Pool;
let invitationService: InvitationService;
let invitationController: InvitationController;

function getInvitationController(): InvitationController {
    if (!invitationController) {
        // Create pool with environment variables (loaded by this time)
        // Use DATABASE_URL if available, otherwise fall back to individual env vars
        const dbConfig = process.env.DATABASE_URL ? {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            max: 10,                        // Reduced for Neon.tech serverless
            idleTimeoutMillis: 30000,       // 30s - Neon.tech recommended
            connectionTimeoutMillis: 10000, // 10s - Better for cold starts
            statement_timeout: 30000,       // 30s query timeout
        } : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
            statement_timeout: 30000,
        };
        pool = new Pool(dbConfig);

        console.log('[invitationRoutes] Database config:', {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD ? '***' : 'fallback'
        });

        invitationService = new InvitationService(pool);
        invitationController = new InvitationController(invitationService);
    }
    return invitationController;
}

// Create new invitation (requires authentication)
router.post('/api/invitations', authenticateToken, (req, res) => getInvitationController().createInvitation(req, res));

// Get user's invitations with pagination (requires authentication)
router.get('/api/invitations', authenticateToken, (req, res) => getInvitationController().getUserInvitations(req, res));

// Get invitation statistics (requires authentication)
router.get('/api/invitations/stats', authenticateToken, (req, res) => getInvitationController().getInvitationStats(req, res));

// Validate invitation code (public endpoint - no auth required)
router.get('/api/invitations/:code/validate', (req, res) => getInvitationController().validateInvitation(req, res));

// Mark invitation as registered (called after successful registration - requires auth)
router.post('/api/invitations/:code/register', authenticateToken, (req, res) => getInvitationController().markAsRegistered(req, res));

export default router;