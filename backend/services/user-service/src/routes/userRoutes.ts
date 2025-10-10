import { Router } from 'express';
import { HexContainer } from '../hexagon/bootstrap/container';
import { UserController } from '../controllers/UserController';
import { validateBody } from '../middleware/validation';
import { forgotPasswordSchema } from '../validation/schemas';
import { forgotPasswordRateLimit } from '../middleware/rateLimit';
import { authenticateToken } from '../middleware/auth';

export function createUserRoutes(container: HexContainer) {
    const router = Router();
    const userController = new UserController();

    // Health check endpoint
    router.get('/health', (_req, res) => {
        res.status(200).send('OK');
    });

    // Public routes
    router.get('/skills', userController.getSkills);
    router.post('/forgot-password', forgotPasswordRateLimit(), validateBody(forgotPasswordSchema), userController.forgotPassword);

    // Protected routes (all routes below require authentication)
    router.use(authenticateToken);

    // User profile routes
    router.get('/profile', userController.getCurrentUser);
    router.get('/profile/complete', async (req, res) => {
        if (!req.user?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const result = await container.getCompleteProfile.execute(req.user.id);
        res.json({ success: true, data: result });
    });
    router.get('/:id', userController.getUserById);
    router.put('/profile', userController.updateUser);
    router.put('/worker-profile', userController.updateWorkerProfile);
    router.put('/contractor-profile', userController.updateContractorProfile);

    // Contact routes
    router.get('/contacts', userController.getContacts);
    router.post('/contacts', userController.createContact);

    // Deprecated PATCH route - kept for backward compatibility
    router.patch('/profile', async (req, res) => {
        if (!req.user?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const result = await container.updateUser.execute(req.user.id, req.body);
        res.json({ success: true, data: result });
    });

    return router;
}

export default createUserRoutes;
