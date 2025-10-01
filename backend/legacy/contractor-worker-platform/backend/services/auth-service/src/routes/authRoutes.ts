import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateSignup, validateLogin } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const authController = new AuthController();

// Public routes
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refreshToken);

// Protected routes
router.post('/logout', authenticateToken, authController.logout);
router.get('/profile', authenticateToken, authController.getProfile);
router.post('/change-password', authenticateToken, authController.changePassword);

// Admin routes (future implementation)
router.get('/users', authenticateToken, authController.getAllUsers);

export default router;