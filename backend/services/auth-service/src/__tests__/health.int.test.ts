import request from 'supertest';
import { buildApp } from '../app';

describe('health endpoint', () => {
    it('returns standardized payload', async () => {
        const app = buildApp();
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('service');
        expect(res.body).toHaveProperty('version');
        expect(res.body).toHaveProperty('uptimeSeconds');
        expect(res.body).toHaveProperty('timestamp');
    });
});
