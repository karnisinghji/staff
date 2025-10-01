import { Pool } from 'pg';
import { CredentialRepositoryPort } from '../../application/ports/CredentialRepositoryPort';
import { UserCredentials } from '../../domain/entities/UserCredentials';
export declare class PgCredentialRepository implements CredentialRepositoryPort {
    private pool;
    constructor(pool: Pool);
    findByEmail(email: string): Promise<UserCredentials | null>;
    findById(id: string): Promise<UserCredentials | null>;
    create(cred: Omit<UserCredentials, 'createdAt'>): Promise<UserCredentials>;
    findByOAuth(provider: string, oauthId: string): Promise<UserCredentials | null>;
    createOAuthUser(data: {
        id: string;
        oauthProvider: string;
        oauthId: string;
        email?: string;
        name?: string;
        username?: string;
        role?: string;
        profileData: any;
    }): Promise<UserCredentials>;
}
