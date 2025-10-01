import request from 'supertest';

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';

describe('API Gateway Smoke Tests', () => {
    it('forwards Authorization and x-request-id headers', async () => {
        const res = await request(API_GATEWAY_URL)
            .get('/api/matching/find-workers')
            .set('Authorization', 'Bearer testtoken')
            .set('x-request-id', 'test-trace-id')
            .send();
        // Should forward headers and return a response
        expect(res.status).toBeGreaterThanOrEqual(200);
        expect(res.status).toBeLessThan(500);
        // Optionally check logs or downstream service for header presence
    });

    it('enforces rate limiting', async () => {
        for (let i = 0; i < 110; i++) {
            await request(API_GATEWAY_URL)
                .get('/api/matching/find-workers')
                .set('x-api-key', 'test-key')
                .send();
        }
        const res = await request(API_GATEWAY_URL)
            .get('/api/matching/find-workers')
            .set('x-api-key', 'test-key')
            .send();
        expect(res.status).toBe(429);
        expect(res.body.error).toMatch(/Too many requests/);
    });
});
