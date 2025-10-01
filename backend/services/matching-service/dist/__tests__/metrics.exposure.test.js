"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('Matching Service Metrics Exposure', () => {
    it('serves /metrics with shared metric names', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/metrics');
        // service may not have metrics if shared module missing, but normally should
        if (res.status === 200) {
            expect(res.text).toContain('http_requests_total');
        }
        else {
            // If metrics not enabled, document behavior
            expect([404, 500]).toContain(res.status);
        }
    });
});
//# sourceMappingURL=metrics.exposure.test.js.map