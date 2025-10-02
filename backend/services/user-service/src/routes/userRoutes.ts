import { Router } from 'express';
// Health helper: require via relative path to avoid needing runtime alias resolution.
let buildHealthPayload: any;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
import { UserController } from '../controllers/UserController';
// Using local validation middleware for legacy routes; introducing shared validation helper for new pattern.
import { validateBody } from '../middleware/validation';
import { z } from 'zod';
import { validate as sharedValidate } from '../../../shared';
import { updateUserSchema, updateWorkerProfileSchema, updateContractorProfileSchema, createContactSchema, updateContactSchema, forgotPasswordSchema } from '../validation/schemas';
import { forgotPasswordRateLimit } from '../middleware/rateLimit';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();
const userController = new UserController();
// Forgot password
router.post('/api/auth/forgot-password', forgotPasswordRateLimit(), validateBody(forgotPasswordSchema), userController.forgotPassword);

// Health check
router.get('/health', (_req, res) => {
    res.json(buildHealthPayload('user-service'));
});

// Public metadata (must come before :id routes)
router.get('/api/users/skills', userController.getSkills);

// User profile routes
router.get('/api/users/profile', authenticateToken, userController.getCurrentUser);
router.get('/api/users/:id', authenticateToken, userController.getUserById);
router.put('/api/users/profile', authenticateToken, validateBody(updateUserSchema), userController.updateUser);

// Worker profile routes
router.put('/api/users/worker-profile',
    authenticateToken,
    requireRole(['worker']),
    validateBody(updateWorkerProfileSchema),
    userController.updateWorkerProfile
);

// Contractor profile routes
router.put('/api/users/contractor-profile',
    authenticateToken,
    requireRole(['contractor']),
    validateBody(updateContractorProfileSchema),
    userController.updateContractorProfile
);

// Contact routes
router.get('/api/users/contacts', authenticateToken, userController.getContacts);
// New pattern: shared validation helper (zod) demonstrates platform-wide approach
const createContactSharedSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().optional(),
    phone: z.string()
        .regex(/^\+91[6-9]\d{9}$/, 'Phone number must be in format +91xxxxxxxxxx (10 digits starting with 6-9)')
        .optional(),
    tags: z.array(z.string()).max(20).optional()
});
router.post('/api/users/contacts', authenticateToken, sharedValidate({ schema: createContactSharedSchema }) as any, userController.createContact);
router.put('/api/users/contacts/:contactId', authenticateToken, validateBody(updateContactSchema), userController.updateContact);
router.delete('/api/users/contacts/:contactId', authenticateToken, userController.deleteContact);

export default router;