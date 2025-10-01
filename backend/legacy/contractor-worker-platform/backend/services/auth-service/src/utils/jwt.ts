import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    username: string;
    role: string;
}

const getSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        // Fail fast: configuration error should surface immediately.
        throw new Error('JWT_SECRET is not set for auth-service');
    }
    return secret;
};

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, getSecret(), { expiresIn: '24h' });
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, getSecret()) as TokenPayload;
};