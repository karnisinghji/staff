import { shutdownPool } from '../../utils/db';
import request from 'supertest';
import app from '../../index';
import jwt from 'jsonwebtoken';
import { MatchingService } from '../../services/MatchingService';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

describe('Matching integration tests', () => {
    it('find-workers requires contractor role and returns 200 when authorized', async () => {
        const token = jwt.sign({ id: '550e8400-e29b-41d4-a716-446655440004', email: 'mike@example.com', role: 'contractor' }, JWT_SECRET, { expiresIn: '1h' });

        const res = await request(app)
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
        const token = jwt.sign({ id: '550e8400-e29b-41d4-a716-446655440004', email: 'mike@example.com', role: 'worker' }, JWT_SECRET, { expiresIn: '1h' });

        const res = await request(app)
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
    await MatchingService.shutdown();
    await shutdownPool();
});

