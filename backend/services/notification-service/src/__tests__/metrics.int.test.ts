import request from 'supertest';
import { buildApp } from '../app';

describe('notification-service /metrics', () => {
    const app = buildApp({ version: 'test', serviceName: 'notification-service' });

    it('exposes metrics endpoint with HELP lines', async () => {
        const res = await request(app).get('/metrics').expect(200);
        expect(res.text).toMatch(/# HELP/);
        expect(res.text).toMatch(/http_requests_total/);
    });

    it('records a request metric for /health', async () => {
        await request(app).get('/health').expect(200);
        const res = await request(app).get('/metrics').expect(200);
        // Check that at least one line contains route label health OR unknown depending on express route matching
        expect(/http_requests_total{.*(route="\/health"|route="unknown").*}/.test(res.text)).toBe(true);
    });
});
