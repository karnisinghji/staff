import { TokenSignerPort } from '../ports/TokenSignerPort';
interface Input {
    refreshToken: string;
}
interface Output {
    accessToken: string;
    expiresInSeconds: number;
}
export declare class RefreshTokenUseCase {
    private signer;
    constructor(signer: TokenSignerPort);
    execute(input: Input): Promise<Output>;
}
export {};
