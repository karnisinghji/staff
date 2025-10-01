"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../utils/db");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const MatchingService_1 = require("../../services/MatchingService");
process.env.JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_SECRET = process.env.JWT_SECRET;
describe('Matching integration tests', () => {
    it('find-workers requires contractor role and returns 200 when authorized', async () => {
        const token = jsonwebtoken_1.default.sign({ id: '550e8400-e29b-41d4-a716-446655440004', email: 'mike@example.com', role: 'contractor' }, JWT_SECRET, { expiresIn: '1h' });
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/matching/find-workers')
            .set('Authorization', `Bearer ${token}`)
            .send({ skillType: 'carpenter', location: 'New York', maxDistance: 50, budgetRange: { max: 40 } });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('matches');
        // pagination fields
        expect(res.body.data).toHaveProperty('page');
        expect(res.body.data).toHaveProperty('limit');
        expect(res.body.data).toHaveProperty('totalPages');
    });
    it('find-contractors requires worker role and returns 200 when authorized', async () => {
        const token = jsonwebtoken_1.default.sign({ id: '550e8400-e29b-41d4-a716-446655440004', email: 'mike@example.com', role: 'worker' }, JWT_SECRET, { expiresIn: '1h' });
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/matching/find-contractors')
            .set('Authorization', `Bearer ${token}`)
            .send({ location: 'New York', maxDistance: 50 });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('matches');
        // pagination fields
        expect(res.body.data).toHaveProperty('page');
        expect(res.body.data).toHaveProperty('limit');
        expect(res.body.data).toHaveProperty('totalPages');
    });
});
afterAll(async () => {
    // Close DB pool to allow Jest to exit
    await MatchingService_1.MatchingService.shutdown();
    await (0, db_1.shutdownPool)();
});
//# sourceMappingURL=matching.int.test.js.map