import { InMemoryMatchingRepository } from '../src/hexagon/infrastructure/persistence/InMemoryMatchingRepository';
import { FindWorkersUseCase } from '../src/hexagon/application/use-cases/FindWorkersUseCase';

describe('FindWorkersUseCase', () => {
    it('returns all workers when no skill criteria provided', async () => {
        const repo = new InMemoryMatchingRepository();
        repo.workers = [
            { id: 'w1', skills: ['plumbing'] },
            { id: 'w2', skills: ['electrical', 'plumbing'] }
        ];
        const useCase = new FindWorkersUseCase(repo);
        const result = await useCase.execute({ requesterId: 'c1' });
        expect(result.map(r => r.id).sort()).toEqual(['w1', 'w2']);
    });

    it('filters by provided skills', async () => {
        const repo = new InMemoryMatchingRepository();
        repo.workers = [
            { id: 'w1', skills: ['plumbing'] },
            { id: 'w2', skills: ['electrical', 'plumbing'] },
            { id: 'w3', skills: ['carpentry'] }
        ];
        const useCase = new FindWorkersUseCase(repo);
        const result = await useCase.execute({ requesterId: 'c1', skills: ['electrical'] });
        expect(result.length).toBe(1);
        expect(result[0].id).toBe('w2');
    });

    it('matches any overlapping skill', async () => {
        const repo = new InMemoryMatchingRepository();
        repo.workers = [
            { id: 'w1', skills: ['plumbing'] },
            { id: 'w2', skills: ['electrical', 'hvac'] }
        ];
        const useCase = new FindWorkersUseCase(repo);
        const result = await useCase.execute({ requesterId: 'c1', skills: ['hvac', 'other'] });
        expect(result.length).toBe(1);
        expect(result[0].id).toBe('w2');
    });
});
