import request from 'supertest';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

import app from '../index';

describe('Communication Service /metrics', () => {
    it('exposes Prometheus metrics', async () => {
        const res = await request(app).get('/metrics');
        // In fallback scenario metrics may still exist if prom-client installed
        expect(res.status).toBe(200);
        expect(res.text).toContain('# HELP');
        expect(/http_requests_total/.test(res.text) || /process_cpu_user_seconds_total/.test(res.text)).toBe(true);
    });
});
