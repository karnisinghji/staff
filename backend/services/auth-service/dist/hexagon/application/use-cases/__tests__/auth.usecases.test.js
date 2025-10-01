"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InMemoryCredentialRepository_1 = require("../../../infrastructure/adapters/InMemoryCredentialRepository");
const BcryptPasswordHasher_1 = require("../../../infrastructure/adapters/BcryptPasswordHasher");
const JwtTokenSigner_1 = require("../../../infrastructure/adapters/JwtTokenSigner");
const RegisterUserUseCase_1 = require("../RegisterUserUseCase");
const LoginUseCase_1 = require("../LoginUseCase");
// Simple mock for deterministic hashing in tests to avoid bcrypt slowdown
class FastHasher extends BcryptPasswordHasher_1.BcryptPasswordHasher {
    async hash(plain) { return `hashed:${plain}`; }
    async compare(plain, hash) { return hash === `hashed:${plain}`; }
}
// Monkey patch jwt secrets in test env
process.env.JWT_SECRET = 'test-access';
process.env.JWT_REFRESH_SECRET = 'test-refresh';
describe('Auth Use Cases', () => {
    const repo = new InMemoryCredentialRepository_1.InMemoryCredentialRepository();
    const hasher = new FastHasher();
    const signer = new JwtTokenSigner_1.JwtTokenSigner();
    const register = new RegisterUserUseCase_1.RegisterUserUseCase(repo, hasher);
    const login = new LoginUseCase_1.LoginUseCase(repo, hasher, signer);
    it('registers and logs in a user', async () => {
        const registered = await register.execute({ email: 'User@Example.com', password: 'secret' });
        expect(registered.email).toBe('user@example.com');
        const logged = await login.execute({ email: 'user@example.com', password: 'secret' });
        expect(logged.user.id).toBe(registered.id);
        expect(logged.accessToken).toBeDefined();
        expect(logged.refreshToken).toBeDefined();
    });
    it('rejects duplicate email', async () => {
        await expect(register.execute({ email: 'dup@example.com', password: 'a' })).resolves.toBeDefined();
        await expect(register.execute({ email: 'dup@example.com', password: 'b' })).rejects.toThrow('EMAIL_TAKEN');
    });
    it('rejects invalid login', async () => {
        await expect(login.execute({ email: 'none@example.com', password: 'x' })).rejects.toThrow('INVALID_CREDENTIALS');
    });
});
//# sourceMappingURL=auth.usecases.test.js.map