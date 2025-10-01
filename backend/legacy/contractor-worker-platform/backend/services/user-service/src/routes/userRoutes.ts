import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// Health check
router.get('/health', (req, res) => {
    res.json({
        service: 'User Service',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// User profile routes
router.get('/api/users/profile', authenticateToken, userController.getCurrentUser);
router.get('/api/users/:id', authenticateToken, userController.getUserById);
router.put('/api/users/profile', authenticateToken, userController.updateUser);

// Worker profile routes
router.put('/api/users/worker-profile',
    authenticateToken,
    requireRole(['worker']),
    userController.updateWorkerProfile
);

// Contractor profile routes
router.put('/api/users/contractor-profile',
    authenticateToken,
    requireRole(['contractor']),
    userController.updateContractorProfile
);

// Contact routes
router.get('/api/users/contacts', authenticateToken, userController.getContacts);
router.post('/api/users/contacts', authenticateToken, userController.createContact);
router.put('/api/users/contacts/:contactId', authenticateToken, userController.updateContact);
router.delete('/api/users/contacts/:contactId', authenticateToken, userController.deleteContact);

export default router;