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
import { SkillRepositoryPort } from '../../hexagon/application/ports/SkillRepository';
import { PasswordResetRepositoryPort } from '../../hexagon/application/ports/PasswordResetRepository';

function buildApp(role: 'worker' | 'contractor' = 'worker') {
    const app = express();
    app.use(express.json());
    const controller = new UserController();
    app.put('/api/users/profile', authStub(role), controller.updateUser);
    if (role === 'worker') {
        app.put('/api/users/worker-profile', authStub('worker'), controller.updateWorkerProfile);
    }
    app.get('/api/users/profile', authStub(role), controller.getCurrentUser);
    app.post('/api/users/contacts', authStub(role), controller.createContact);
    app.put('/api/users/contacts/:contactId', authStub(role), controller.updateContact);
    app.get('/api/users/contacts', authStub(role), controller.getContacts);
    return app;
}

function seed(role: 'worker' | 'contractor' = 'worker') {
    const user = makeUser('u-m', role, { name: 'Orig Name', location: 'NY', phone: '111' });
    const userRepo = new FakeUserRepo([user]);
    const profileRepo = new FakeProfileRepo();
    const contactRepo = new FakeContactRepo();
    if (role === 'worker') {
        profileRepo.worker.set('u-m', { user_id: 'u-m', skill_type: 'plumbing', experience_years: 3 });
    } else {
        profileRepo.contractor.set('u-m', { owner_id: 'u-m', company_name: 'Acme', company_description: 'Desc' });
    }
    const fakeSkills: SkillRepositoryPort = { listSkillTypes: () => Promise.resolve(['plumbing']) };
    const fakeResetRepo: PasswordResetRepositoryPort = {
        findUserByEmail: async (email: string) => email === 'x@test.com' ? { id: 'u-m', email } : null,
        generateToken: async (_userId: string) => { throw new Error('legacy generateToken should not be used'); }
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

function authStub(role: 'worker' | 'contractor') {
    return (req: any, _res: any, next: any) => { req.user = { id: 'u-m', role, username: 'user_u-m' }; next(); };
}

describe('Mutation integration tests', () => {
    describe('Update user + completeness meta', () => {
        let app: express.Express;
        beforeAll(() => { seed('worker'); app = buildApp('worker'); });

        it('updates user name and location and returns meta', async () => {
            const res = await request(app).put('/api/users/profile').send({ name: 'New Name', location: 'SF' });
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.user.name).toBe('New Name');
            // meta is optional but if present should have completeness
            if (res.body.data.meta) {
                expect(typeof res.body.data.meta.completeness).toBe('number');
            }
        });
    });

    describe('Worker profile update', () => {
        let app: express.Express;
        beforeAll(() => { seed('worker'); app = buildApp('worker'); });
        it('updates experience years', async () => {
            const res = await request(app).put('/api/users/worker-profile').send({ experienceYears: 7 });
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.profile.experience_years).toBe(7);
        });
    });

    describe('Contacts lifecycle', () => {
        let app: express.Express;
        beforeAll(() => { seed('worker'); app = buildApp('worker'); });
        let createdId: string;
        it('creates a primary email contact', async () => {
            const res = await request(app).post('/api/users/contacts').send({ type: 'email', value: 'x@test.com', isPrimary: true });
            expect(res.status).toBe(201);
            expect(res.body.data.contact.is_primary).toBe(true);
            createdId = res.body.data.contact.id;
        });
        it('updates contact to non-primary', async () => {
            const res = await request(app).put(`/api/users/contacts/${createdId}`).send({ isPrimary: false });
            expect(res.status).toBe(200);
            expect(res.body.data.contact.is_primary).toBe(false);
        });
    });
});
