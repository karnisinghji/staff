"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe('health endpoint', () => {
    it('returns standardized payload', async () => {
        const app = (0, app_1.buildApp)();
        const res = await (0, supertest_1.default)(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('service');
        expect(res.body).toHaveProperty('version');
        expect(res.body).toHaveProperty('uptimeSeconds');
        expect(res.body).toHaveProperty('timestamp');
    });
});
//# sourceMappingURL=health.int.test.js.map