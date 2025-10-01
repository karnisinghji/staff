import { TokenSignerPort } from '../../application/ports/TokenSignerPort';
export declare class JwtTokenSigner implements TokenSignerPort {
    signAccessToken(payload: object, expiresIn: string | number): string;
    signRefreshToken(payload: object, expiresIn: string | number): string;
    verify<T = any>(token: string): T;
}
