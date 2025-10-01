import { GetCompleteProfileUseCase } from '../GetCompleteProfile';
import { FakeUserRepo, FakeContactRepo, FakeProfileRepo, makeUser } from './fakes';

function breakdownMap(arr: any[]) { return Object.fromEntries(arr.map(i => [i.field, i.present])); }

describe('GetCompleteProfileUseCase', () => {
    it('returns null when user not found', async () => {
        const uc = new GetCompleteProfileUseCase(new FakeUserRepo(), new FakeContactRepo(), new FakeProfileRepo());
        const result = await uc.execute('missing');
        expect(result).toBeNull();
    });

    it('computes completeness with only base user fields', async () => {
        const user = makeUser('u1', 'worker', { name: 'Alice', location: 'NY' });
        const uc = new GetCompleteProfileUseCase(new FakeUserRepo([user]), new FakeContactRepo(), new FakeProfileRepo());
        const result = await uc.execute('u1');
        expect(result).not.toBeNull();
        expect(result!.meta.completeness).toBeGreaterThan(0);
        expect(breakdownMap(result!.meta.completenessBreakdown)).toHaveProperty('name', true);
    });

    it('includes contacts in completeness', async () => {
        const user = makeUser('u2', 'worker', { name: 'Bob', location: 'LA' });
        const contactsRepo = new FakeContactRepo();
        await contactsRepo.create('u2', { type: 'email', value: 'a@b.com', isPrimary: true });
        const uc = new GetCompleteProfileUseCase(new FakeUserRepo([user]), contactsRepo, new FakeProfileRepo());
        const result = await uc.execute('u2');
        expect(breakdownMap(result!.meta.completenessBreakdown).contacts).toBe(true);
    });

    it('worker profile fields influence completeness', async () => {
        const user = makeUser('u3', 'worker', { name: 'C', location: 'TX' });
        const profiles = new FakeProfileRepo();
        profiles.worker.set('u3', { user_id: 'u3', skill_type: 'plumbing', experience_years: 5 });
        const uc = new GetCompleteProfileUseCase(new FakeUserRepo([user]), new FakeContactRepo(), profiles);
        const result = await uc.execute('u3');
        const map = breakdownMap(result!.meta.completenessBreakdown);
        expect(map['worker_experience']).toBe(true);
    });

    it('contractor profile fields influence completeness', async () => {
        const user = makeUser('u4', 'contractor', { name: 'D', location: 'CA' });
        const profiles = new FakeProfileRepo();
        profiles.contractor.set('u4', { owner_id: 'u4', company_name: 'BuildCo', company_description: 'Desc' });
        const uc = new GetCompleteProfileUseCase(new FakeUserRepo([user]), new FakeContactRepo(), profiles);
        const result = await uc.execute('u4');
        const map = breakdownMap(result!.meta.completenessBreakdown);
        expect(map['contractor_company']).toBe(true);
    });
});
