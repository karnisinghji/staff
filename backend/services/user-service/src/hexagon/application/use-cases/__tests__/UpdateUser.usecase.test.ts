import { UpdateUserUseCase } from '../UpdateUser';
import { FakeUserRepo, makeUser } from './fakes';

describe('UpdateUserUseCase', () => {
    it('throws on empty update set', async () => {
        const repo = new FakeUserRepo([makeUser('u1', 'worker', { name: 'A', location: 'X' })]);
        const uc = new UpdateUserUseCase(repo);
        await expect(uc.execute('u1', {})).rejects.toThrow('No valid update fields');
    });
    it('updates a single field', async () => {
        const repo = new FakeUserRepo([makeUser('u2', 'worker', { name: 'A', location: 'X' })]);
        const uc = new UpdateUserUseCase(repo);
        const updated = await uc.execute('u2', { phone: '123' });
        expect(updated.phone).toBe('123');
    });
});
