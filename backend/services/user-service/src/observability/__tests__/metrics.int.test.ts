import request from 'supertest';

// Provide required env vars BEFORE importing the app so initEnv doesn't throw
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_NAME = process.env.DB_NAME || 'testdb';
process.env.DB_USER = process.env.DB_USER || 'testuser';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'testpass';

// Import after env setup
import app from '../../index';

describe('Metrics endpoint (user-service)', () => {
    it('exposes /metrics with custom user-service counters and http metrics', async () => {
        const res = await request(app).get('/metrics');
        expect(res.status).toBe(200);
        const body = res.text;
        // Core prom-client format check
        expect(body).toContain('# HELP');
        // Custom counters we registered (verify new naming convention)
        expect(body).toContain('user_service_password_reset_requests_total');
        expect(body).toContain('user_service_skills_list_requests_total');
        // Shared HTTP metrics (name depends on bundle; check a generic pattern)
        expect(/http_requests_total/.test(body) || /http_request_duration_ms/.test(body)).toBe(true);
    });
});
