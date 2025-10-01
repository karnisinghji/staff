import { UserEntity } from '../../../domain/entities/User';
import { UserRepositoryPort, UpdateUserFields } from '../../ports/UserRepository';
import { ContactRepositoryPort, ContactRecord, CreateContactDTO, UpdateContactDTO } from '../../ports/ContactRepository';
import { ProfileRepositoryPort, WorkerProfileRecord, ContractorProfileRecord } from '../../ports/ProfileRepository';
export declare class FakeUserRepo implements UserRepositoryPort {
    store: Map<string, UserEntity>;
    constructor(seed?: UserEntity[]);
    findById(id: string): Promise<UserEntity | null>;
    updateUser(id: string, fields: UpdateUserFields): Promise<UserEntity>;
}
export declare class FakeContactRepo implements ContactRepositoryPort {
    contacts: ContactRecord[];
    constructor(seed?: ContactRecord[]);
    findByOwner(userId: string): Promise<ContactRecord[]>;
    create(ownerId: string, dto: CreateContactDTO): Promise<ContactRecord>;
    update(contactId: string, ownerId: string, dto: UpdateContactDTO): Promise<{
        is_primary: boolean;
        value: string;
        type: string;
        id: string;
        owner_id: string;
        is_verified: boolean;
        created_at: string;
    }>;
    delete(contactId: string, ownerId: string): Promise<void>;
}
export declare class FakeProfileRepo implements ProfileRepositoryPort {
    worker: Map<string, WorkerProfileRecord>;
    contractor: Map<string, ContractorProfileRecord>;
    getWorkerProfile(userId: string): Promise<WorkerProfileRecord | null>;
    getContractorProfile(userId: string): Promise<ContractorProfileRecord | null>;
    updateWorkerProfile(userId: string, fields: any): Promise<any>;
    updateContractorProfile(userId: string, fields: any): Promise<any>;
}
export declare function makeUser(id: string, role: 'worker' | 'contractor', partial?: Partial<Omit<ConstructorParameters<typeof UserEntity>[0], 'id' | 'role' | 'createdAt' | 'username'>>): UserEntity;
