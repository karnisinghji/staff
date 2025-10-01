import { WorkerCandidate, ContractorCandidate } from '../../../domain/entities/Candidate';
import { Preferences, WeightConfig } from '../../../domain/entities/Preferences';
import { Match } from '../../../domain/entities/Match';
import { SavedMatchPage, MatchStats } from '../../../domain/entities/Stats';
import { GeoPoint } from '../../../domain/value-objects/GeoPoint';
import { Pagination } from '../../../domain/value-objects/Pagination';
export type { WorkerCandidate, ContractorCandidate, Preferences, WeightConfig, Match, SavedMatchPage, MatchStats, Pagination, GeoPoint };
export interface MatchingRepositoryPort {
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
export interface FindWorkersCriteria {
    requesterId: string;
    skills?: string[];
    location?: GeoPoint;
    maxDistanceKm?: number;
    page?: number;
    pageSize?: number;
}
export interface FindContractorsCriteria {
    requesterId: string;
    skillsNeeded?: string[];
    location?: GeoPoint;
    maxDistanceKm?: number;
    page?: number;
    pageSize?: number;
}
