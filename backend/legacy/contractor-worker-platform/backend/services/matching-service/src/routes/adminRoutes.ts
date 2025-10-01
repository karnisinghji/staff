import { Router } from 'express';
import { adminController } from '../controllers/AdminController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

router.get('/api/admin/matching/weights', authenticateToken, requireRole(['admin']), adminController.getDefaultWeights);
router.put('/api/admin/matching/weights', authenticateToken, requireRole(['admin']), adminController.updateDefaultWeights);
router.post('/api/admin/matching/cache/invalidate', authenticateToken, requireRole(['admin']), adminController.invalidateCache);

export default router;
