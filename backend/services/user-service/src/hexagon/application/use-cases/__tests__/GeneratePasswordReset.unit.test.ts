import { GeneratePasswordResetUseCase } from '../../use-cases/GeneratePasswordReset';
import { PasswordResetRepositoryPort } from '../../ports/PasswordResetRepository';
import { PasswordResetTokenRepositoryPort } from '../../ports/PasswordResetTokenRepository';
import { NotFoundError } from '../../../domain/errors/DomainErrors';
import { NotificationPort } from '../../ports/NotificationPort';

class FakeUserLookup implements PasswordResetRepositoryPort {
    constructor(private user: { id: string; email: string } | null) { }
    findUserByEmail(email: string) { return Promise.resolve(this.user && this.user.email === email ? this.user : null); }
    // legacy method not used
    generateToken(): any { throw new Error('legacy generateToken not used'); }
}
class FakeTokenRepo implements PasswordResetTokenRepositoryPort {
    created: any[] = [];
    create(userId: string, token: string, expiresAt: Date) { this.created.push({ userId, token, expiresAt }); return Promise.resolve(); }
    findActiveByUser() { return Promise.resolve(null); }
    findByToken() { return Promise.resolve(null); }
    markConsumed() { return Promise.resolve(); }
}
class FakeNotifier implements NotificationPort { sent: any[] = []; sendPasswordResetEmail(p: any) { this.sent.push(p); return Promise.resolve(); } }

describe('GeneratePasswordResetUseCase (unit)', () => {
    it('throws NotFoundError for unknown email', async () => {
        const useCase = new GeneratePasswordResetUseCase(new FakeUserLookup(null), new FakeTokenRepo(), new FakeNotifier());
        await expect(useCase.execute('x@example.com')).rejects.toBeInstanceOf(NotFoundError);
    });
    it('creates token record and returns token data', async () => {
        const tokenRepo = new FakeTokenRepo();
        const notifier = new FakeNotifier();
        const useCase = new GeneratePasswordResetUseCase(new FakeUserLookup({ id: 'u1', email: 'a@example.com' }), tokenRepo, notifier);
        const res = await useCase.execute('a@example.com');
        expect(res.userId).toBe('u1');
        expect(res.email).toBe('a@example.com');
        expect((res as any).token).toBeUndefined();
        expect(tokenRepo.created.length).toBe(1);
        expect(notifier.sent.length).toBe(1);
    });
    it('creates a new token each time (no reuse policy now)', async () => {
        const tokenRepo = new FakeTokenRepo();
        const notifier = new FakeNotifier();
        const useCase = new GeneratePasswordResetUseCase(new FakeUserLookup({ id: 'u1', email: 'a@example.com' }), tokenRepo, notifier);
        await useCase.execute('a@example.com');
        await new Promise(r => setTimeout(r, 5));
        await useCase.execute('a@example.com');
        expect(tokenRepo.created.length).toBe(2);
        expect(notifier.sent.length).toBe(2);
        const [first, second] = tokenRepo.created;
        expect(first.token).not.toBe(second.token);
    });
});