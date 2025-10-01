"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../controllers/AdminController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/api/admin/matching/weights', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), AdminController_1.adminController.getDefaultWeights);
router.put('/api/admin/matching/weights', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), AdminController_1.adminController.updateDefaultWeights);
router.post('/api/admin/matching/cache/invalidate', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), AdminController_1.adminController.invalidateCache);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map