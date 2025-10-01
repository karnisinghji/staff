"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHexContainer = getHexContainer;
exports.__setHexContainerForTests = __setHexContainerForTests;
const pg_1 = require("pg");
const PgRepositories_1 = require("../infrastructure/db/PgRepositories");
const GetCompleteProfile_1 = require("../application/use-cases/GetCompleteProfile");
const UpdateUser_1 = require("../application/use-cases/UpdateUser");
const UpdateWorkerProfile_1 = require("../application/use-cases/UpdateWorkerProfile");
const UpdateContractorProfile_1 = require("../application/use-cases/UpdateContractorProfile");
const Contacts_1 = require("../application/use-cases/Contacts");
const ListSkills_1 = require("../application/use-cases/ListSkills");
const GeneratePasswordReset_1 = require("../application/use-cases/GeneratePasswordReset");
const InMemoryNotificationAdapter_1 = require("../infrastructure/notification/InMemoryNotificationAdapter");
let container = null;
function getHexContainer() {
    if (container)
        return container;
    const pool = new pg_1.Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'contractor_worker_platform',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
    });
    const userRepo = new PgRepositories_1.PgUserRepository(pool);
    const contactRepo = new PgRepositories_1.PgContactRepository(pool);
    const profileRepo = new PgRepositories_1.PgProfileRepository(pool);
    const skillRepo = new PgRepositories_1.PgSkillRepository(pool);
    const resetRepo = new PgRepositories_1.InMemoryPasswordResetRepository(pool); // user lookup only for now
    const resetTokenRepo = new PgRepositories_1.PgPasswordResetTokenRepository(pool);
    const notification = new InMemoryNotificationAdapter_1.InMemoryNotificationAdapter();
    container = {
        getCompleteProfile: new GetCompleteProfile_1.GetCompleteProfileUseCase(userRepo, contactRepo, profileRepo),
        updateUser: new UpdateUser_1.UpdateUserUseCase(userRepo),
        updateWorkerProfile: new UpdateWorkerProfile_1.UpdateWorkerProfileUseCase(profileRepo),
        updateContractorProfile: new UpdateContractorProfile_1.UpdateContractorProfileUseCase(profileRepo),
        listContacts: new Contacts_1.ListContactsUseCase(contactRepo),
        createContact: new Contacts_1.CreateContactUseCase(contactRepo),
        updateContact: new Contacts_1.UpdateContactUseCase(contactRepo),
        deleteContact: new Contacts_1.DeleteContactUseCase(contactRepo),
        listSkills: new ListSkills_1.ListSkillsUseCase(skillRepo),
        generatePasswordReset: new GeneratePasswordReset_1.GeneratePasswordResetUseCase(resetRepo, resetTokenRepo, notification)
    };
    return container;
}
// Test override hook (ONLY for tests)
function __setHexContainerForTests(mock) {
    // Runtime safety: ensure all required keys exist in mock. Helps surface incomplete overrides early.
    const required = [
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
    const missing = required.filter(k => !mock[k]);
    if (missing.length) {
        throw new Error(`__setHexContainerForTests: missing keys in mock: ${missing.join(', ')}`);
    }
    container = mock;
}
//# sourceMappingURL=container.js.map