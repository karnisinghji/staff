"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
const index_1 = __importDefault(require("../index"));
describe('Communication Service /metrics', () => {
    it('exposes Prometheus metrics', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/metrics');
        // In fallback scenario metrics may still exist if prom-client installed
        expect(res.status).toBe(200);
        expect(res.text).toContain('# HELP');
        expect(/http_requests_total/.test(res.text) || /process_cpu_user_seconds_total/.test(res.text)).toBe(true);
    });
});
//# sourceMappingURL=metrics.int.test.js.map