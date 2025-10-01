import request from 'supertest';
import express from 'express';
import { forgotPasswordRateLimit } from '../rateLimit';

describe('forgotPasswordRateLimit middleware', () => {
    it('allows up to limit then blocks with 429', async () => {
        const app = express();
        app.use(express.json());
        app.post('/api/auth/forgot-password', forgotPasswordRateLimit({ limit: 3, windowMs: 1000 }), (req, res) => res.json({ ok: true }));
        let res;
        for (let i = 1; i <= 3; i++) {
            res = await request(app).post('/api/auth/forgot-password').send({ email: 'a@example.com' });
            expect(res.status).toBe(200);
        }
        res = await request(app).post('/api/auth/forgot-password').send({ email: 'a@example.com' });
        expect(res.status).toBe(429);
        expect(res.body.code).toBe('RATE_LIMITED');
    });
});
