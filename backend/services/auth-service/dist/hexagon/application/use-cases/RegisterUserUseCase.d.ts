import { CredentialRepositoryPort } from '../ports/CredentialRepositoryPort';
import { PasswordHasherPort } from '../ports/PasswordHasherPort';
interface Input {
    email: string;
    password: string;
    roles?: string[];
}
interface Output {
    id: string;
    email: string;
    roles: string[];
}
export declare class RegisterUserUseCase {
    private repo;
    private hasher;
    constructor(repo: CredentialRepositoryPort, hasher: PasswordHasherPort);
    execute(input: Input): Promise<Output>;
}
export {};
