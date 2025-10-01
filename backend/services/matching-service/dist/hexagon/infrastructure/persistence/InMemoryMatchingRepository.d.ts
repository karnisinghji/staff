import { MatchingRepositoryPort, FindWorkersCriteria, FindContractorsCriteria } from '../../application/ports/outbound/MatchingRepositoryPort';
import { WorkerCandidate, ContractorCandidate } from '../../domain/entities/Candidate';
import { Preferences, WeightConfig } from '../../domain/entities/Preferences';
import { Match } from '../../domain/entities/Match';
import { SavedMatchPage, MatchStats } from '../../domain/entities/Stats';
import { Pagination } from '../../domain/value-objects/Pagination';
export declare class InMemoryMatchingRepository implements MatchingRepositoryPort {
    workers: WorkerCandidate[];
    contractors: ContractorCandidate[];
    preferences: Record<string, Preferences>;
    matches: Match[];
    weightConfig: WeightConfig;
    findWorkers(criteria: FindWorkersCriteria): Promise<WorkerCandidate[]>;
    findContractors(criteria: FindContractorsCriteria): Promise<ContractorCandidate[]>;
    upsertPreferences(prefs: Preferences): Promise<void>;
    getPreferences(userId: string): Promise<Preferences | null>;
    saveMatch(match: Match): Promise<void>;
    listSavedMatches(userId: string, pagination: Pagination): Promise<SavedMatchPage>;
    deleteSavedMatch(userId: string, matchId: string): Promise<boolean>;
    getStats(): Promise<MatchStats>;
    updateWeightConfig(config: WeightConfig): Promise<void>;
    getWeightConfig(): Promise<WeightConfig>;
}
