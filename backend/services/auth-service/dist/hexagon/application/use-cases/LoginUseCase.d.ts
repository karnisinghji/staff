import { CredentialRepositoryPort } from '../ports/CredentialRepositoryPort';
import { PasswordHasherPort } from '../ports/PasswordHasherPort';
import { TokenSignerPort, SignedTokens } from '../ports/TokenSignerPort';
interface Input {
    email: string;
    password: string;
}
interface Output extends SignedTokens {
    user: {
        id: string;
        email: string;
        roles: string[];
    };
}
export declare class LoginUseCase {
    private repo;
    private hasher;
    private signer;
    constructor(repo: CredentialRepositoryPort, hasher: PasswordHasherPort, signer: TokenSignerPort);
    execute(input: Input): Promise<Output>;
}
export {};
