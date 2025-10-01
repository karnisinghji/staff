"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// Set minimal env before importing app
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
const index_1 = __importDefault(require("../../index"));
describe('Matching Service /metrics', () => {
    it('returns Prometheus metrics output', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/metrics');
        expect(res.status).toBe(200);
        expect(res.text).toContain('# HELP');
        // Should include default metrics or http counters
        expect(/http_requests_total/.test(res.text) || /process_cpu_user_seconds_total/.test(res.text)).toBe(true);
    });
});
//# sourceMappingURL=metrics.int.test.js.map