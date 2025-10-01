import request from 'supertest';
import app from '../index';

// Integration smoke test to ensure /metrics endpoint exposes shared and custom metrics.
// Assumes server does not auto-listen a second time (index exports the app instance).

describe('User Service Metrics Exposure', () => {
    it('serves /metrics with expected metric names', async () => {
        const res = await request(app).get('/metrics');
        expect(res.status).toBe(200);
        expect(res.text).toContain('http_requests_total');
        expect(res.text).toContain('user_service_password_reset_requests_total');
    });
});
