import { ListSkillsUseCase } from '../ListSkills';
import { SkillRepositoryPort } from '../../ports/SkillRepository';

class FakeSkills implements SkillRepositoryPort {
    constructor(private values: string[]) { }
    listSkillTypes(): Promise<string[]> { return Promise.resolve(this.values); }
}

describe('ListSkillsUseCase', () => {
    it('returns list of skills', async () => {
        const uc = new ListSkillsUseCase(new FakeSkills(['plumbing', 'electrical']));
        await expect(uc.execute()).resolves.toEqual(['plumbing', 'electrical']);
    });
    it('returns empty array when none', async () => {
        const uc = new ListSkillsUseCase(new FakeSkills([]));
        await expect(uc.execute()).resolves.toEqual([]);
    });
});
