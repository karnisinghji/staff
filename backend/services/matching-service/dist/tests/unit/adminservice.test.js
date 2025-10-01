"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminService_1 = require("../../services/AdminService");
describe('AdminService listener and cache API', () => {
    it('constructs without throwing when notifications disabled', () => {
        process.env.ENABLE_ADMIN_PG_NOTIFICATIONS = 'false';
        const svc = new AdminService_1.AdminService();
        expect(typeof svc.clearCache).toBe('function');
        // restore
        delete process.env.ENABLE_ADMIN_PG_NOTIFICATIONS;
    });
});
//# sourceMappingURL=adminservice.test.js.map