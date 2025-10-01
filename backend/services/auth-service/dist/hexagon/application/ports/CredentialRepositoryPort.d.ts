import { UserCredentials } from '../../domain/entities/UserCredentials';
export interface CredentialRepositoryPort {
    findByEmail(email: string): Promise<UserCredentials | null>;
    findById(id: string): Promise<UserCredentials | null>;
    create(cred: Omit<UserCredentials, 'createdAt'>): Promise<UserCredentials>;
}
