"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Health helper: require via relative path to avoid needing runtime alias resolution.
let buildHealthPayload;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ({ buildHealthPayload } = require('../../../shared/src/health'));
}
catch {
    buildHealthPayload = (service, version, domain) => ({
        status: 'ok',
        service,
        version: version || process.env.npm_package_version || 'unknown',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    });
}
const UserController_1 = require("../controllers/UserController");
// Using local validation middleware for legacy routes; introducing shared validation helper for new pattern.
const validation_1 = require("../middleware/validation");
const zod_1 = require("zod");
const shared_1 = require("../../../shared");
const schemas_1 = require("../validation/schemas");
const rateLimit_1 = require("../middleware/rateLimit");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// Forgot password
router.post('/api/auth/forgot-password', (0, rateLimit_1.forgotPasswordRateLimit)(), (0, validation_1.validateBody)(schemas_1.forgotPasswordSchema), userController.forgotPassword);
// Health check
router.get('/health', (_req, res) => {
    res.json(buildHealthPayload('user-service'));
});
// User profile routes
router.get('/api/users/profile', auth_1.authenticateToken, userController.getCurrentUser);
router.get('/api/users/:id', auth_1.authenticateToken, userController.getUserById);
router.put('/api/users/profile', auth_1.authenticateToken, (0, validation_1.validateBody)(schemas_1.updateUserSchema), userController.updateUser);
// Public metadata
router.get('/api/users/skills', userController.getSkills);
// Worker profile routes
router.put('/api/users/worker-profile', auth_1.authenticateToken, (0, auth_1.requireRole)(['worker']), (0, validation_1.validateBody)(schemas_1.updateWorkerProfileSchema), userController.updateWorkerProfile);
// Contractor profile routes
router.put('/api/users/contractor-profile', auth_1.authenticateToken, (0, auth_1.requireRole)(['contractor']), (0, validation_1.validateBody)(schemas_1.updateContractorProfileSchema), userController.updateContractorProfile);
// Contact routes
router.get('/api/users/contacts', auth_1.authenticateToken, userController.getContacts);
// New pattern: shared validation helper (zod) demonstrates platform-wide approach
const createContactSharedSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(5).optional(),
    tags: zod_1.z.array(zod_1.z.string()).max(20).optional()
});
router.post('/api/users/contacts', auth_1.authenticateToken, (0, shared_1.validate)({ schema: createContactSharedSchema }), userController.createContact);
router.put('/api/users/contacts/:contactId', auth_1.authenticateToken, (0, validation_1.validateBody)(schemas_1.updateContactSchema), userController.updateContact);
router.delete('/api/users/contacts/:contactId', auth_1.authenticateToken, userController.deleteContact);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map