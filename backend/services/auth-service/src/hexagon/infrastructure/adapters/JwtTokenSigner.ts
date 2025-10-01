import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenSignerPort } from '../../application/ports/TokenSignerPort';

const ACCESS_SECRET: string = process.env.JWT_SECRET || 'access-secret';
const REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

export class JwtTokenSigner implements TokenSignerPort {
    signAccessToken(payload: object, expiresIn: string | number): string {
        const options: SignOptions = { expiresIn } as SignOptions;
        return jwt.sign(payload as any, ACCESS_SECRET, options);
    }
    signRefreshToken(payload: object, expiresIn: string | number): string {
        const options: SignOptions = { expiresIn } as SignOptions;
        return jwt.sign(payload as any, REFRESH_SECRET, options);
    }
    verify<T = any>(token: string): T {
        // Try access then refresh secret
        try {
            return jwt.verify(token, ACCESS_SECRET) as T;
        } catch {
            return jwt.verify(token, REFRESH_SECRET) as T;
        }
    }
}
