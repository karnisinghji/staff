import { CredentialRepositoryPort } from '../../application/ports/CredentialRepositoryPort';
import { UserCredentials } from '../../domain/entities/UserCredentials';
export declare class InMemoryCredentialRepository implements CredentialRepositoryPort {
    private items;
    findByEmail(email: string): Promise<UserCredentials | null>;
    findById(id: string): Promise<UserCredentials | null>;
    create(cred: Omit<UserCredentials, 'createdAt'>): Promise<UserCredentials>;
}
