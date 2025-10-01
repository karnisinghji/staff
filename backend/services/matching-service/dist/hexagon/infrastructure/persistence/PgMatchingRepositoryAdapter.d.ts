import { MatchingRepositoryPort, FindWorkersCriteria, FindContractorsCriteria, WorkerCandidate, ContractorCandidate, Preferences, Match, SavedMatchPage, MatchStats, Pagination, WeightConfig } from '../../application/ports/outbound/MatchingRepositoryPort';
export declare class PgMatchingRepositoryAdapter implements MatchingRepositoryPort {
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
