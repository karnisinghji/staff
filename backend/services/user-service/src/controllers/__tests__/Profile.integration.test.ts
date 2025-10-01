import express from 'express';
import request from 'supertest';
import { UserController } from '../UserController';
import { __setHexContainerForTests } from '../../hexagon/bootstrap/container';
import { GetCompleteProfileUseCase } from '../../hexagon/application/use-cases/GetCompleteProfile';
import { UpdateUserUseCase } from '../../hexagon/application/use-cases/UpdateUser';
import { UpdateWorkerProfileUseCase } from '../../hexagon/application/use-cases/UpdateWorkerProfile';
import { UpdateContractorProfileUseCase } from '../../hexagon/application/use-cases/UpdateContractorProfile';
import { ListContactsUseCase, CreateContactUseCase, UpdateContactUseCase, DeleteContactUseCase } from '../../hexagon/application/use-cases/Contacts';
import { FakeUserRepo, FakeContactRepo, FakeProfileRepo, makeUser } from '../../hexagon/application/use-cases/__tests__/fakes';
import { ListSkillsUseCase } from '../../hexagon/application/use-cases/ListSkills';
import { GeneratePasswordResetUseCase } from '../../hexagon/application/use-cases/GeneratePasswordReset';
import { InMemoryPasswordResetTokenRepository } from '../../hexagon/infrastructure/db/PgRepositories';
import { PasswordResetRepositoryPort } from '../../hexagon/application/ports/PasswordResetRepository';
import { SkillRepositoryPort } from '../../hexagon/application/ports/SkillRepository';

// Build fake container (must run before app/controller instantiation so controller captures injected hex)
function setupContainer() {
    const user = makeUser('u-int', 'worker', { name: 'Int User', location: 'NY' });
    const userRepo = new FakeUserRepo([user]);
    const contactRepo = new FakeContactRepo();
    const profileRepo = new FakeProfileRepo();
    profileRepo.worker.set('u-int', { user_id: 'u-int', skill_type: 'plumbing', experience_years: 4 });
    contactRepo.create('u-int', { type: 'email', value: 'int@test.com', isPrimary: true });
    // minimal fake implementations for new ports
    const fakeSkills: SkillRepositoryPort = { listSkillTypes: () => Promise.resolve(['plumbing', 'electrical']) };
    const fakeResetRepo: PasswordResetRepositoryPort = {
        findUserByEmail: async (email: string) => email === 'int@test.com' ? { id: 'u-int', email } : null,
        generateToken: async (_userId: string) => { throw new Error('legacy generateToken should not be called after refactor'); }
    };
    const tokenRepo = new InMemoryPasswordResetTokenRepository();
    __setHexContainerForTests({
        getCompleteProfile: new GetCompleteProfileUseCase(userRepo, contactRepo, profileRepo),
        updateUser: new UpdateUserUseCase(userRepo),
        updateWorkerProfile: new UpdateWorkerProfileUseCase(profileRepo),
        updateContractorProfile: new UpdateContractorProfileUseCase(profileRepo),
        listContacts: new ListContactsUseCase(contactRepo),
        createContact: new CreateContactUseCase(contactRepo),
        updateContact: new UpdateContactUseCase(contactRepo),
        deleteContact: new DeleteContactUseCase(contactRepo),
        listSkills: new ListSkillsUseCase(fakeSkills),
        generatePasswordReset: new GeneratePasswordResetUseCase(fakeResetRepo, tokenRepo)
    });
}

// Stub auth middleware injecting a fake user
function authStub(req: any, _res: any, next: any) {
    req.user = { id: 'u-int', role: 'worker', username: 'user_u-int' };
    next();
}

describe('GET /api/users/profile (integration)', () => {
    let app: express.Express;
    beforeAll(() => {
        setupContainer();
        app = express();
        const controller = new UserController();
        app.get('/api/users/profile', authStub, controller.getCurrentUser);
    });

    it('returns profile with completeness meta and breakdown array', async () => {
        const res = await request(app).get('/api/users/profile');
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        const data = res.body.data;
        expect(data.meta).toBeDefined();
        expect(Array.isArray(data.meta.completenessBreakdown)).toBe(true);
        const fields = data.meta.completenessBreakdown.map((b: any) => b.field);
        expect(fields).toContain('name');
    });
});
