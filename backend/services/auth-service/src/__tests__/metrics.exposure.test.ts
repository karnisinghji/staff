import request from 'supertest';
import app from '../index';

describe('Auth Service Metrics Exposure', () => {
    it('serves /metrics with shared metric names', async () => {
        const res = await request(app).get('/metrics');
        expect(res.status).toBe(200);
        expect(res.text).toContain('http_requests_total');
    });
});
