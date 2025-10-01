"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../utils/db");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Ensure JWT secret present for verifyToken() during tests
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-admin';
// Mock the AdminService methods
jest.mock('../../services/AdminService', () => ({
    adminService: {
        getDefaultWeights: jest.fn(async () => ({ skill: 40, distance: 25 })),
        updateDefaultWeights: jest.fn(async (w) => ({ ...w })),
        clearCache: jest.fn(() => { })
    }
}));
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
describe('Admin endpoints', () => {
    it('GET /api/admin/matching/weights requires admin role', async () => {
        const token = jsonwebtoken_1.default.sign({ id: 'admin1', email: 'a@a.com', role: 'admin' }, JWT_SECRET);
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/api/admin/matching/weights')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
    });
    it('PUT /api/admin/matching/weights updates weights', async () => {
        const token = jsonwebtoken_1.default.sign({ id: 'admin1', email: 'a@a.com', role: 'admin' }, JWT_SECRET);
        const res = await (0, supertest_1.default)(index_1.default)
            .put('/api/admin/matching/weights')
            .set('Authorization', `Bearer ${token}`)
            .send({ weights: { skill: 50 } });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.skill).toBe(50);
    });
    it('POST /api/admin/matching/cache/invalidate clears cache', async () => {
        const token = jsonwebtoken_1.default.sign({ id: 'admin1', email: 'a@a.com', role: 'admin' }, JWT_SECRET);
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/admin/matching/cache/invalidate')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
afterAll(async () => {
    // If the real AdminService is used in other tests, attempt to shutdown its listener.
    try {
        const svcMod = await Promise.resolve().then(() => __importStar(require('../../services/AdminService')));
        if (svcMod && svcMod.adminService && typeof svcMod.adminService.shutdown === 'function') {
            await svcMod.adminService.shutdown();
        }
        await (0, db_1.shutdownPool)();
    }
    catch (e) {
        // ignore
    }
});
//# sourceMappingURL=admin.int.test.js.map