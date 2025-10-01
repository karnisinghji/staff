import { Pool } from 'pg';
import { PgUserRepository, PgContactRepository, PgProfileRepository, PgSkillRepository, InMemoryPasswordResetRepository, PgPasswordResetTokenRepository } from '../infrastructure/db/PgRepositories';
import { GetCompleteProfileUseCase } from '../application/use-cases/GetCompleteProfile';
import { UpdateUserUseCase } from '../application/use-cases/UpdateUser';
import { UpdateWorkerProfileUseCase } from '../application/use-cases/UpdateWorkerProfile';
import { UpdateContractorProfileUseCase } from '../application/use-cases/UpdateContractorProfile';
import { ListContactsUseCase, CreateContactUseCase, UpdateContactUseCase, DeleteContactUseCase } from '../application/use-cases/Contacts';
import { ListSkillsUseCase } from '../application/use-cases/ListSkills';
import { GeneratePasswordResetUseCase } from '../application/use-cases/GeneratePasswordReset';
import { InMemoryNotificationAdapter } from '../infrastructure/notification/InMemoryNotificationAdapter';
import { PgPasswordResetTokenRepository as _UnusedTypeGuard } from '../infrastructure/db/PgRepositories';

export interface HexContainer {
    getCompleteProfile: GetCompleteProfileUseCase;
    updateUser: UpdateUserUseCase;
    updateWorkerProfile: UpdateWorkerProfileUseCase;
    updateContractorProfile: UpdateContractorProfileUseCase;
    listContacts: ListContactsUseCase;
    createContact: CreateContactUseCase;
    updateContact: UpdateContactUseCase;
    deleteContact: DeleteContactUseCase;
    listSkills: ListSkillsUseCase;
    generatePasswordReset: GeneratePasswordResetUseCase;
}

let container: HexContainer | null = null;

export function getHexContainer(): HexContainer {
    if (container) return container;
    const pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'contractor_worker_platform',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    });
    const userRepo = new PgUserRepository(pool);
    const contactRepo = new PgContactRepository(pool);
    const profileRepo = new PgProfileRepository(pool);
    const skillRepo = new PgSkillRepository(pool);
    const resetRepo = new InMemoryPasswordResetRepository(pool); // user lookup only for now
    const resetTokenRepo = new PgPasswordResetTokenRepository(pool);
    const notification = new InMemoryNotificationAdapter();
    container = {
        getCompleteProfile: new GetCompleteProfileUseCase(userRepo, contactRepo, profileRepo),
        updateUser: new UpdateUserUseCase(userRepo),
        updateWorkerProfile: new UpdateWorkerProfileUseCase(profileRepo),
        updateContractorProfile: new UpdateContractorProfileUseCase(profileRepo),
        listContacts: new ListContactsUseCase(contactRepo),
        createContact: new CreateContactUseCase(contactRepo),
        updateContact: new UpdateContactUseCase(contactRepo),
        deleteContact: new DeleteContactUseCase(contactRepo),
        listSkills: new ListSkillsUseCase(skillRepo),
        generatePasswordReset: new GeneratePasswordResetUseCase(resetRepo, resetTokenRepo, notification)
    };
    return container;
}

// Test override hook (ONLY for tests)
export function __setHexContainerForTests(mock: HexContainer) {
    // Runtime safety: ensure all required keys exist in mock. Helps surface incomplete overrides early.
    const required: (keyof HexContainer)[] = [
        'getCompleteProfile',
        'updateUser',
        'updateWorkerProfile',
        'updateContractorProfile',
        'listContacts',
        'createContact',
        'updateContact',
        'deleteContact',
        'listSkills',
        'generatePasswordReset'
    ];
    const missing = required.filter(k => !(mock as any)[k]);
    if (missing.length) {
        throw new Error(`__setHexContainerForTests: missing keys in mock: ${missing.join(', ')}`);
    }
    container = mock;
}
