import { CredentialRepositoryPort } from '../ports/CredentialRepositoryPort';
import { PasswordHasherPort } from '../ports/PasswordHasherPort';
import { v4 as uuid } from 'uuid';

interface Input { email: string; password: string; roles?: string[] }
interface Output { id: string; email: string; roles: string[] }

export class RegisterUserUseCase {
    constructor(private repo: CredentialRepositoryPort, private hasher: PasswordHasherPort) { }

    async execute(input: Input): Promise<Output> {
        const identifier = input.email.toLowerCase();
        const existing = await this.repo.findByEmail(identifier);

        if (existing) {
            // Determine if identifier is phone or email for better error message
            const isPhone = /^[\+]?[0-9]{7,15}$/.test(identifier);
            if (isPhone) {
                throw new Error('USERNAME_TAKEN:phone number');
            } else {
                throw new Error('EMAIL_TAKEN');
            }
        }

        const passwordHash = await this.hasher.hash(input.password);
        const created = await this.repo.create({
            id: uuid(),
            email: identifier,
            passwordHash,
            roles: input.roles && input.roles.length ? input.roles : ['user']
        });
        return { id: created.id, email: created.email, roles: created.roles };
    }
}
