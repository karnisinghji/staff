import { TokenSignerPort } from '../ports/TokenSignerPort';

interface Input { refreshToken: string }
interface Output { accessToken: string; expiresInSeconds: number }

export class RefreshTokenUseCase {
    constructor(private signer: TokenSignerPort) { }

    async execute(input: Input): Promise<Output> {
        try {
            const decoded = this.signer.verify<any>(input.refreshToken);
            const accessToken = this.signer.signAccessToken({ sub: decoded.sub, roles: decoded.roles }, '24h');
            return { accessToken, expiresInSeconds: 24 * 60 * 60 };
        } catch (e) {
            throw new Error('INVALID_REFRESH');
        }
    }
}
