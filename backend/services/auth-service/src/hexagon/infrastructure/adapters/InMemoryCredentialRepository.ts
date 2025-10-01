import { CredentialRepositoryPort } from '../../application/ports/CredentialRepositoryPort';
import { UserCredentials } from '../../domain/entities/UserCredentials';

export class InMemoryCredentialRepository implements CredentialRepositoryPort {
    private items = new Map<string, UserCredentials>();

    async findByEmail(email: string): Promise<UserCredentials | null> {
        email = email.toLowerCase();
        for (const item of Array.from(this.items.values())) {
            if (item.email === email) return item;
        }
        return null;
    }
    async findById(id: string): Promise<UserCredentials | null> { return this.items.get(id) || null; }
    async create(cred: Omit<UserCredentials, 'createdAt'>): Promise<UserCredentials> {
        const record: UserCredentials = { ...cred, createdAt: new Date() };
        this.items.set(record.id, record);
        return record;
    }
}
