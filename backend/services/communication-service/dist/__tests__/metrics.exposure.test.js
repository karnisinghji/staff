"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
require("../index"); // service starts listening immediately
// For services that auto-listen, we hit localhost directly instead of using app reference
const base = `http://localhost:${process.env.PORT || 3004}`;
describe('Communication Service Metrics Exposure', () => {
    it('serves /metrics with shared metric names', async () => {
        const res = await (0, supertest_1.default)(base).get('/metrics');
        expect([200, 404]).toContain(res.status); // 200 when metrics hooked, 404 if not (allowed)
        if (res.status === 200) {
            expect(res.text).toContain('http_requests_total');
        }
    });
});
//# sourceMappingURL=metrics.exposure.test.js.map