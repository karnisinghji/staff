import { CredentialRepositoryPort } from '../ports/CredentialRepositoryPort';
import { PasswordHasherPort } from '../ports/PasswordHasherPort';
import { TokenSignerPort, SignedTokens } from '../ports/TokenSignerPort';

interface Input { email: string; password: string }
interface Output extends SignedTokens { user: { id: string; email: string; roles: string[] } }

export class LoginUseCase {
    constructor(private repo: CredentialRepositoryPort, private hasher: PasswordHasherPort, private signer: TokenSignerPort) { }

    async execute(input: Input): Promise<Output> {
        const cred = await this.repo.findByEmail(input.email.toLowerCase());
        if (!cred) throw new Error('INVALID_CREDENTIALS');
        const ok = await this.hasher.compare(input.password, cred.passwordHash);
        if (!ok) throw new Error('INVALID_CREDENTIALS');
        const accessToken = this.signer.signAccessToken({ sub: cred.id, roles: cred.roles }, '15m');
        const refreshToken = this.signer.signRefreshToken({ sub: cred.id }, '7d');
        return { accessToken, refreshToken, expiresInSeconds: 15 * 60, user: { id: cred.id, email: cred.email, roles: cred.roles } };
    }
}
