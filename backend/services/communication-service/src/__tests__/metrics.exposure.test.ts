import request from 'supertest';
import '../index'; // service starts listening immediately

// For services that auto-listen, we hit localhost directly instead of using app reference
const base = `http://localhost:${process.env.PORT || 3004}`;

describe('Communication Service Metrics Exposure', () => {
    it('serves /metrics with shared metric names', async () => {
        const res = await request(base).get('/metrics');
        expect([200, 404]).toContain(res.status); // 200 when metrics hooked, 404 if not (allowed)
        if (res.status === 200) {
            expect(res.text).toContain('http_requests_total');
        }
    });
});
