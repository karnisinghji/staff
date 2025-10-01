export interface SignedTokens {
    accessToken: string;
    refreshToken: string;
    expiresInSeconds: number;
}
export interface TokenSignerPort {
    signAccessToken(payload: object, expiresIn: string | number): string;
    signRefreshToken(payload: object, expiresIn: string | number): string;
    verify<T = any>(token: string): T;
}
