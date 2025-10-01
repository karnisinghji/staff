import { User, WorkerProfile, ContractorProfile, Contact, UpdateUserRequest, UpdateWorkerProfileRequest, UpdateContractorProfileRequest, CreateContactRequest } from '../types';
export declare class UserService {
    private pool;
    private resetTokens;
    constructor();
    findUserByEmail(email: string): Promise<User | null>;
    generatePasswordResetToken(userId: string): Promise<string>;
    getUserById(id: string): Promise<User | null>;
    updateUser(id: string, userData: UpdateUserRequest): Promise<User>;
    getWorkerProfile(userId: string): Promise<WorkerProfile | null>;
    updateWorkerProfile(userId: string, profileData: UpdateWorkerProfileRequest): Promise<WorkerProfile>;
    getContractorProfile(userId: string): Promise<ContractorProfile | null>;
    updateContractorProfile(userId: string, profileData: UpdateContractorProfileRequest): Promise<ContractorProfile>;
    getUserContacts(userId: string): Promise<Contact[]>;
    createContact(userId: string, contactData: CreateContactRequest): Promise<Contact>;
    updateContact(contactId: string, userId: string, updates: Partial<CreateContactRequest>): Promise<Contact>;
    deleteContact(contactId: string, userId: string): Promise<void>;
    getCompleteUserProfile(userId: string): Promise<any>;
    getSkillTypes(): Promise<string[]>;
}
