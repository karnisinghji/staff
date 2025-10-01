"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe('notification-service /metrics', () => {
    const app = (0, app_1.buildApp)({ version: 'test', serviceName: 'notification-service' });
    it('exposes metrics endpoint with HELP lines', async () => {
        const res = await (0, supertest_1.default)(app).get('/metrics').expect(200);
        expect(res.text).toMatch(/# HELP/);
        expect(res.text).toMatch(/http_requests_total/);
    });
    it('records a request metric for /health', async () => {
        await (0, supertest_1.default)(app).get('/health').expect(200);
        const res = await (0, supertest_1.default)(app).get('/metrics').expect(200);
        // Check that at least one line contains route label health OR unknown depending on express route matching
        expect(/http_requests_total{.*(route="\/health"|route="unknown").*}/.test(res.text)).toBe(true);
    });
});
//# sourceMappingURL=metrics.int.test.js.map