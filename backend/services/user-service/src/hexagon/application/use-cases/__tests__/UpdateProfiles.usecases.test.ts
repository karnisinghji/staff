import { UpdateWorkerProfileUseCase } from '../UpdateWorkerProfile';
import { UpdateContractorProfileUseCase } from '../UpdateContractorProfile';
import { FakeProfileRepo } from './fakes';

describe('Profile update use cases', () => {
    it('updates worker profile fields', async () => {
        const repo = new FakeProfileRepo();
        repo.worker.set('w1', { user_id: 'w1', skill_type: 'plumbing', experience_years: 2 });
        const uc = new UpdateWorkerProfileUseCase(repo);
        const updated = await uc.execute('w1', { experienceYears: 3 });
        expect(updated.experience_years).toBe(3);
    });
    it('updates contractor profile fields', async () => {
        const repo = new FakeProfileRepo();
        repo.contractor.set('c1', { owner_id: 'c1', company_name: 'OldCo', company_description: 'Old' });
        const uc = new UpdateContractorProfileUseCase(repo);
        const updated = await uc.execute('c1', { companyDescription: 'New Desc' });
        expect(updated.company_description).toBe('New Desc');
    });
});
