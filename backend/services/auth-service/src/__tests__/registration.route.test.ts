import request from 'supertest';
import { buildApp } from '../app';

// Build one app instance to preserve in-memory repository state for duplicate email test
const app = buildApp();

describe('Registration HTTP endpoint /api/auth/register', () => {
    it('creates a user successfully with 201 and expected payload', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'newuser@example.com', password: 'supersecret123', roles: ['user'] })
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', 'newuser@example.com');
        expect(res.body).toHaveProperty('roles');
        expect(Array.isArray(res.body.roles)).toBe(true);
    });

    it('rejects duplicate email with 409 structured error', async () => {
        // First create user
        await request(app)
            .post('/api/auth/register')
            .send({ email: 'dup@example.com', password: 'supersecret123' })
            .set('Content-Type', 'application/json');

        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'dup@example.com', password: 'anothersecret123' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error.code', 'EMAIL_TAKEN');
        expect(res.body).toHaveProperty('fields.email');
    });

    it('returns structured validation error when password missing', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'missingpass@example.com' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error.code', 'VALIDATION_ERROR');
        expect(res.body.fields).toHaveProperty('password');
        expect(Array.isArray(res.body.issues)).toBe(true);
    });

    it('returns validation error for invalid email format', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'not-an-email', password: 'supersecret123' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error.code', 'VALIDATION_ERROR');
        expect(res.body.fields).toHaveProperty('email');
    });

    it('returns validation error for empty roles array if provided', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'rolesfail@example.com', password: 'supersecret123', roles: [] })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error.code', 'VALIDATION_ERROR');
        expect(res.body.fields).toHaveProperty('roles');
    });
});
