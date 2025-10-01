import { shutdownPool } from '../../utils/db';
import request from 'supertest';
import app from '../../index';
import jwt from 'jsonwebtoken';

// Mock the AdminService methods
jest.mock('../../services/AdminService', () => ({
    adminService: {
        getDefaultWeights: jest.fn(async () => ({ skill: 40, distance: 25 })),
        updateDefaultWeights: jest.fn(async (w: any) => ({ ...w }))
        , clearCache: jest.fn(() => { })
    }
}));

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

describe('Admin endpoints', () => {
    it('GET /api/admin/matching/weights requires admin role', async () => {
        const token = jwt.sign({ id: 'admin1', email: 'a@a.com', role: 'admin' }, JWT_SECRET);
        const res = await request(app)
            .get('/api/admin/matching/weights')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
    });

    it('PUT /api/admin/matching/weights updates weights', async () => {
        const token = jwt.sign({ id: 'admin1', email: 'a@a.com', role: 'admin' }, JWT_SECRET);
        const res = await request(app)
            .put('/api/admin/matching/weights')
            .set('Authorization', `Bearer ${token}`)
            .send({ weights: { skill: 50 } });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.skill).toBe(50);
    });

    it('POST /api/admin/matching/cache/invalidate clears cache', async () => {
        const token = jwt.sign({ id: 'admin1', email: 'a@a.com', role: 'admin' }, JWT_SECRET);
        const res = await request(app)
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
        const svcMod = await import('../../services/AdminService');
        if (svcMod && svcMod.adminService && typeof svcMod.adminService.shutdown === 'function') {
            await svcMod.adminService.shutdown();
        }
        await shutdownPool();
    } catch (e) {
        // ignore
    }
});
