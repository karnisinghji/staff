"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContainer = buildContainer;
const InMemoryCredentialRepository_1 = require("./infrastructure/adapters/InMemoryCredentialRepository");
const PgCredentialRepository_1 = require("./infrastructure/adapters/PgCredentialRepository");
const BcryptPasswordHasher_1 = require("./infrastructure/adapters/BcryptPasswordHasher");
const JwtTokenSigner_1 = require("./infrastructure/adapters/JwtTokenSigner");
const RegisterUserUseCase_1 = require("./application/use-cases/RegisterUserUseCase");
const LoginUseCase_1 = require("./application/use-cases/LoginUseCase");
const RefreshTokenUseCase_1 = require("./application/use-cases/RefreshTokenUseCase");
const GetHealthUseCase_1 = require("./application/use-cases/GetHealthUseCase");
const db_1 = require("../infrastructure/db");
function buildContainer() {
    // Use PostgreSQL by default, fallback to in-memory for tests
    const usePostgres = process.env.NODE_ENV !== 'test' && process.env.USE_MEMORY_DB !== 'true';
    const credRepo = usePostgres
        ? new PgCredentialRepository_1.PgCredentialRepository(db_1.pool)
        : new InMemoryCredentialRepository_1.InMemoryCredentialRepository();
    const hasher = new BcryptPasswordHasher_1.BcryptPasswordHasher();
    const signer = new JwtTokenSigner_1.JwtTokenSigner();
    return {
        registerUser: new RegisterUserUseCase_1.RegisterUserUseCase(credRepo, hasher),
        login: new LoginUseCase_1.LoginUseCase(credRepo, hasher, signer),
        refreshToken: new RefreshTokenUseCase_1.RefreshTokenUseCase(signer),
        getHealth: new GetHealthUseCase_1.GetHealthUseCase()
    };
}
//# sourceMappingURL=index.js.map