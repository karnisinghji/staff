import type { MatchCriteria, WorkerMatch, ContractorMatch, MatchPreferences, UpdateMatchPreferencesRequest } from '../types';
import type { SavedMatch, SaveMatchRequest } from '../types';
export declare class MatchingService {
    static shutdown(): Promise<void>;
    /**
     * Find workers matching criteria with robust paging/filtering and edge case handling.
     * Paging: Use 'page' and 'limit' in criteria. Default limit is 20, max 100.
     * Filtering: Minimum match score is 30. Results sorted by score.
     * Edge cases: Handles missing location, zero results, invalid input.
     */
    findWorkersForCriteria(criteria: MatchCriteria): Promise<import('../types').PaginatedResult<WorkerMatch>>;
    findContractorsForCriteria(criteria: MatchCriteria): Promise<import('../types').PaginatedResult<ContractorMatch>>;
    getUserMatchPreferences(userId: string): Promise<MatchPreferences | null>;
    upsertMatchPreferences(userId: string, preferences: UpdateMatchPreferencesRequest): Promise<MatchPreferences>;
    saveMatch(userId: string, matchData: SaveMatchRequest): Promise<SavedMatch>;
    getSavedMatches(userId: string): Promise<SavedMatch[]>;
    deleteSavedMatch(userId: string, matchId: string): Promise<void>;
}
