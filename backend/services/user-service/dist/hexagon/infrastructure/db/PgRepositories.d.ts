import { Pool } from 'pg';
import { UserRepositoryPort, UpdateUserFields } from '../../application/ports/UserRepository';
import { ContactRepositoryPort, ContactRecord, CreateContactDTO, UpdateContactDTO } from '../../application/ports/ContactRepository';
import { ProfileRepositoryPort, WorkerProfileRecord, ContractorProfileRecord } from '../../application/ports/ProfileRepository';
import { SkillRepositoryPort } from '../../application/ports/SkillRepository';
import { PasswordResetRepositoryPort } from '../../application/ports/PasswordResetRepository';
import { PasswordResetTokenRepositoryPort, PasswordResetTokenRecord } from '../../application/ports/PasswordResetTokenRepository';
import { UserEntity } from '../../domain/entities/User';
export declare class PgUserRepository implements UserRepositoryPort {
    private pool;
    constructor(pool: Pool);
    findById(id: string): Promise<UserEntity | null>;
    updateUser(id: string, fields: UpdateUserFields): Promise<UserEntity>;
}
export declare class PgContactRepository implements ContactRepositoryPort {
    private pool;
    constructor(pool: Pool);
    findByOwner(userId: string): Promise<ContactRecord[]>;
    create(ownerId: string, dto: CreateContactDTO): Promise<ContactRecord>;
    update(contactId: string, ownerId: string, dto: UpdateContactDTO): Promise<ContactRecord>;
    delete(contactId: string, ownerId: string): Promise<void>;
}
export declare class PgProfileRepository implements ProfileRepositoryPort {
    private pool;
    constructor(pool: Pool);
    getWorkerProfile(userId: string): Promise<WorkerProfileRecord | null>;
    getContractorProfile(userId: string): Promise<ContractorProfileRecord | null>;
    updateWorkerProfile(userId: string, fields: Partial<{
        skillType: string;
        experienceYears: number;
        hourlyRate: number;
        availability: string;
        description: string;
        isAvailable: boolean;
    }>): Promise<WorkerProfileRecord>;
    updateContractorProfile(userId: string, fields: Partial<{
        companyName: string;
        companyDescription: string;
    }>): Promise<ContractorProfileRecord>;
}
export declare class PgSkillRepository implements SkillRepositoryPort {
    private pool;
    constructor(pool: Pool);
    listSkillTypes(): Promise<string[]>;
}
export declare class InMemoryPasswordResetRepository implements PasswordResetRepositoryPort {
    private pool;
    private tokens;
    constructor(pool: Pool);
    findUserByEmail(email: string): Promise<any>;
    generateToken(userId: string): Promise<{
        token: string;
        expiresAt: Date;
    }>;
}
export declare class PgPasswordResetTokenRepository implements PasswordResetTokenRepositoryPort {
    private pool;
    constructor(pool: Pool);
    create(userId: string, token: string, expiresAt: Date): Promise<void>;
    findActiveByUser(userId: string, now: Date): Promise<PasswordResetTokenRecord | null>;
    findByToken(token: string): Promise<PasswordResetTokenRecord | null>;
    markConsumed(token: string, at: Date): Promise<void>;
    purgeExpired(now: Date): Promise<number>;
}
export declare class InMemoryPasswordResetTokenRepository implements PasswordResetTokenRepositoryPort {
    private records;
    create(userId: string, token: string, expiresAt: Date): Promise<void>;
    findActiveByUser(userId: string, now: Date): Promise<PasswordResetTokenRecord | null>;
    findByToken(token: string): Promise<PasswordResetTokenRecord | null>;
    markConsumed(token: string, at: Date): Promise<void>;
    purgeExpired(now: Date): Promise<number>;
}
