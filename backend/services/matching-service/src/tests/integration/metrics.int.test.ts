import request from 'supertest';

// Set minimal env before importing app
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

import app from '../../index';

describe('Matching Service /metrics', () => {
    it('returns Prometheus metrics output', async () => {
        const res = await request(app).get('/metrics');
        expect(res.status).toBe(200);
        expect(res.text).toContain('# HELP');
        // Should include default metrics or http counters
        expect(/http_requests_total/.test(res.text) || /process_cpu_user_seconds_total/.test(res.text)).toBe(true);
    });
});
