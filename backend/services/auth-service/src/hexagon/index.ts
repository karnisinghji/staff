import { InMemoryCredentialRepository } from './infrastructure/adapters/InMemoryCredentialRepository';
import { PgCredentialRepository } from './infrastructure/adapters/PgCredentialRepository';
import { BcryptPasswordHasher } from './infrastructure/adapters/BcryptPasswordHasher';
import { JwtTokenSigner } from './infrastructure/adapters/JwtTokenSigner';
import { RegisterUserUseCase } from './application/use-cases/RegisterUserUseCase';
import { LoginUseCase } from './application/use-cases/LoginUseCase';
import { RefreshTokenUseCase } from './application/use-cases/RefreshTokenUseCase';
import { GetHealthUseCase } from './application/use-cases/GetHealthUseCase';
import { pool } from '../infrastructure/db';

export interface AuthHexContainer {
    registerUser: RegisterUserUseCase;
    login: LoginUseCase;
    refreshToken: RefreshTokenUseCase;
    getHealth: GetHealthUseCase;
}

export function buildContainer(): AuthHexContainer {
    // Use PostgreSQL by default, fallback to in-memory for tests
    const usePostgres = process.env.NODE_ENV !== 'test' && process.env.USE_MEMORY_DB !== 'true';
    const credRepo = usePostgres
        ? new PgCredentialRepository(pool)
        : new InMemoryCredentialRepository();

    const hasher = new BcryptPasswordHasher();
    const signer = new JwtTokenSigner();
    return {
        registerUser: new RegisterUserUseCase(credRepo, hasher),
        login: new LoginUseCase(credRepo, hasher, signer),
        refreshToken: new RefreshTokenUseCase(signer),
        getHealth: new GetHealthUseCase()
    };
}
