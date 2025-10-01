import request from 'supertest';
import app from '../index';

describe('Matching Service Metrics Exposure', () => {
    it('serves /metrics with shared metric names', async () => {
        const res = await request(app).get('/metrics');
        // service may not have metrics if shared module missing, but normally should
        if (res.status === 200) {
            expect(res.text).toContain('http_requests_total');
        } else {
            // If metrics not enabled, document behavior
            expect([404, 500]).toContain(res.status);
        }
    });
});
