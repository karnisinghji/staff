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

    // Protected routes
    router.use(authenticateToken);

    // User profile routes - using hexagonal use cases directly via the controller
    router.get('/profile/complete', async (req, res) => {
        const result = await container.getCompleteProfile.execute(req.user.id);
        res.json({ success: true, data: result });
    });

    // Route for updating user data
    router.patch('/profile', async (req, res) => {
        const result = await container.updateUser.execute({
            userId: req.user.id,
            ...req.body
        });
        res.json({ success: true, data: result });
    });

    return router;
}
