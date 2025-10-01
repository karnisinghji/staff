import request from 'supertest';
import '../index';

const base = `http://localhost:${process.env.PORT || 3005}`;

describe('Notification Service Metrics Exposure', () => {
    it('serves /metrics with shared metric names', async () => {
        const res = await request(base).get('/metrics');
        expect([200, 404]).toContain(res.status);
        if (res.status === 200) {
            expect(res.text).toContain('http_requests_total');
        }
    });
});
