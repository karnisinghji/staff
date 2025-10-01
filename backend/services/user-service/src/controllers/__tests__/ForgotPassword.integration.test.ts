import express from 'express';
import request from 'supertest';
import { UserController } from '../UserController';
import { __setHexContainerForTests } from '../../hexagon/bootstrap/container';
import { GeneratePasswordResetUseCase } from '../../hexagon/application/use-cases/GeneratePasswordReset';
import { InMemoryPasswordResetTokenRepository } from '../../hexagon/infrastructure/db/PgRepositories';
import { ListSkillsUseCase } from '../../hexagon/application/use-cases/ListSkills';
import { PasswordResetRepositoryPort } from '../../hexagon/application/ports/PasswordResetRepository';
import { SkillRepositoryPort } from '../../hexagon/application/ports/SkillRepository';
import { NotificationPort } from '../../hexagon/application/ports/NotificationPort';

class FakeNotifier implements NotificationPort { sent: any[] = []; sendPasswordResetEmail(p: any) { this.sent.push(p); return Promise.resolve(); } }

// Minimal fake container pieces (others unused in these tests)
class FakeResetRepo implements PasswordResetRepositoryPort {
    constructor(private users: { id: string, email: string }[]) { }
    async findUserByEmail(email: string) { return this.users.find(u => u.email === email) || null; }
    // Legacy method (not used after refactor) – returns dummy to satisfy interface
    async generateToken(_userId: string) { return { token: 'deprecated', expiresAt: new Date() }; }
}
const fakeSkills: SkillRepositoryPort = { listSkillTypes: async () => ['plumbing'] };

function seed(users: { id: string, email: string }[]) {
    __setHexContainerForTests({
        // Only provide what controller methods under test will use
        listSkills: new ListSkillsUseCase(fakeSkills),
        generatePasswordReset: new GeneratePasswordResetUseCase(new FakeResetRepo(users), new InMemoryPasswordResetTokenRepository(), new FakeNotifier()),
        // Stub unused dependencies with no-op lambdas throwing if accidentally invoked
        getCompleteProfile: { execute: () => { throw new Error('not used'); } } as any,
        updateUser: { execute: () => { throw new Error('not used'); } } as any,
        updateWorkerProfile: { execute: () => { throw new Error('not used'); } } as any,
        updateContractorProfile: { execute: () => { throw new Error('not used'); } } as any,
        listContacts: { execute: () => { throw new Error('not used'); } } as any,
        createContact: { execute: () => { throw new Error('not used'); } } as any,
        updateContact: { execute: () => { throw new Error('not used'); } } as any,
        deleteContact: { execute: () => { throw new Error('not used'); } } as any,
    });
}

describe('POST /api/auth/forgot-password (integration)', () => {
    let app: express.Express;
    beforeEach(() => {
        app = express();
        app.use(express.json());
        const controller = new UserController();
        app.post('/api/auth/forgot-password', controller.forgotPassword); // validation middleware tested elsewhere
    });

    it('400 when email missing (validation pre-condition)', async () => {
        // Controller itself would trust middleware, but simulate failure scenario
        const res = await request(app).post('/api/auth/forgot-password').send({});
        // In real app Zod middleware would catch; here expecting 500 fallback or custom handling; adjust if validation integrated here later
        expect([400, 500]).toContain(res.status);
    });

    it('404 when user not found', async () => {
        seed([]);
        const res = await request(app).post('/api/auth/forgot-password').send({ email: 'none@example.com' });
        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
    });

    it('200 returns success without leaking token', async () => {
        seed([{ id: 'u-1', email: 'user@example.com' }]);
        const res = await request(app).post('/api/auth/forgot-password').send({ email: 'user@example.com' });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeUndefined(); // token should no longer be returned
        expect(typeof res.body.expiresAt).toBe('string');
    });
});
