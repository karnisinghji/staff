import { MatchingRepositoryPort, FindWorkersCriteria, FindContractorsCriteria } from '../../application/ports/outbound/MatchingRepositoryPort';
import { WorkerCandidate, ContractorCandidate } from '../../domain/entities/Candidate';
import { Preferences, WeightConfig } from '../../domain/entities/Preferences';
import { Match } from '../../domain/entities/Match';
import { SavedMatchPage, MatchStats } from '../../domain/entities/Stats';
import { Pagination } from '../../domain/value-objects/Pagination';

export class InMemoryMatchingRepository implements MatchingRepositoryPort {
    workers: WorkerCandidate[] = [];
    contractors: ContractorCandidate[] = [];
    preferences: Record<string, Preferences> = {};
    matches: Match[] = [];
    weightConfig: WeightConfig = {};

    async findWorkers(criteria: FindWorkersCriteria): Promise<WorkerCandidate[]> {
        return this.workers.filter(w => {
            if (criteria.skills && criteria.skills.length) {
                return w.skills.some(s => criteria.skills!.includes(s));
            }
            return true;
        });
    }

    async findContractors(criteria: FindContractorsCriteria): Promise<ContractorCandidate[]> {
        return this.contractors.filter(c => {
            if (criteria.skillsNeeded && criteria.skillsNeeded.length) {
                return criteria.skillsNeeded.some(s => c.skillsNeeded?.includes(s));
            }
            return true;
        });
    }

    async upsertPreferences(prefs: Preferences): Promise<void> {
        this.preferences[prefs.userId] = prefs;
    }

    async getPreferences(userId: string): Promise<Preferences | null> {
        return this.preferences[userId] || null;
    }

    async saveMatch(match: Match): Promise<void> {
        this.matches.push(match);
    }

    async listSavedMatches(userId: string, pagination: Pagination): Promise<SavedMatchPage> {
        const all = this.matches.filter(m => m.userA === userId || m.userB === userId);
        const start = (pagination.page - 1) * pagination.pageSize;
        const slice = all.slice(start, start + pagination.pageSize);
        return { matches: slice, total: all.length, page: pagination.page, pageSize: pagination.pageSize };
    }

    async deleteSavedMatch(userId: string, matchId: string): Promise<boolean> {
        const idx = this.matches.findIndex(m => m.id === matchId && (m.userA === userId || m.userB === userId));
        if (idx >= 0) {
            this.matches.splice(idx, 1);
            return true;
        }
        return false;
    }

    async getStats(): Promise<MatchStats> {
        return { totalMatches: this.matches.length, workerCount: this.workers.length, contractorCount: this.contractors.length } as any;
    }

    async updateWeightConfig(config: WeightConfig): Promise<void> {
        this.weightConfig = { ...this.weightConfig, ...config };
    }

    async getWeightConfig(): Promise<WeightConfig> {
        return { ...this.weightConfig };
    }
}
