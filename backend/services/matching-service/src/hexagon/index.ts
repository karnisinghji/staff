// Composition root for hexagonal matching-service (incremental migration)
import { PgMatchingRepositoryAdapter } from './infrastructure/persistence/PgMatchingRepositoryAdapter';
import { FindWorkersUseCase } from './application/use-cases/FindWorkersUseCase';
import { FindContractorsUseCase } from './application/use-cases/FindContractorsUseCase';
import { GetPreferencesUseCase } from './application/use-cases/GetPreferencesUseCase';
import { UpsertPreferencesUseCase } from './application/use-cases/UpsertPreferencesUseCase';
import { SaveMatchUseCase } from './application/use-cases/SaveMatchUseCase';
import { ListSavedMatchesUseCase } from './application/use-cases/ListSavedMatchesUseCase';
import { DeleteSavedMatchUseCase } from './application/use-cases/DeleteSavedMatchUseCase';
import { UpdateWeightConfigUseCase } from './application/use-cases/UpdateWeightConfigUseCase';
import { GetMatchStatsUseCase } from './application/use-cases/GetMatchStatsUseCase';
import { GetWeightConfigUseCase } from './application/use-cases/GetWeightConfigUseCase';

export interface MatchingModule {
    useCases: {
        findWorkers: FindWorkersUseCase;
        findContractors: FindContractorsUseCase;
        getPreferences: GetPreferencesUseCase;
        upsertPreferences: UpsertPreferencesUseCase;
        saveMatch: SaveMatchUseCase;
        listSavedMatches: ListSavedMatchesUseCase;
        deleteSavedMatch: DeleteSavedMatchUseCase;
        updateWeightConfig: UpdateWeightConfigUseCase;
        getMatchStats: GetMatchStatsUseCase;
        getWeightConfig: GetWeightConfigUseCase;
    }
}

export function buildMatchingModule(): MatchingModule {
    const repo = new PgMatchingRepositoryAdapter();
    const findWorkers = new FindWorkersUseCase(repo);
    const findContractors = new FindContractorsUseCase(repo);
    const getPreferences = new GetPreferencesUseCase(repo);
    const upsertPreferences = new UpsertPreferencesUseCase(repo);
    const saveMatch = new SaveMatchUseCase(repo);
    const listSavedMatches = new ListSavedMatchesUseCase(repo);
    const deleteSavedMatch = new DeleteSavedMatchUseCase(repo);
    const updateWeightConfig = new UpdateWeightConfigUseCase(repo);
    const getMatchStats = new GetMatchStatsUseCase(repo);
    const getWeightConfig = new GetWeightConfigUseCase(repo);
    return {
        useCases: { findWorkers, findContractors, getPreferences, upsertPreferences, saveMatch, listSavedMatches, deleteSavedMatch, updateWeightConfig, getMatchStats, getWeightConfig }
    };
}

