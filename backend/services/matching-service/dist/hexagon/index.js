"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMatchingModule = buildMatchingModule;
// Composition root for hexagonal matching-service (incremental migration)
const PgMatchingRepositoryAdapter_1 = require("./infrastructure/persistence/PgMatchingRepositoryAdapter");
const FindWorkersUseCase_1 = require("./application/use-cases/FindWorkersUseCase");
const FindContractorsUseCase_1 = require("./application/use-cases/FindContractorsUseCase");
const GetPreferencesUseCase_1 = require("./application/use-cases/GetPreferencesUseCase");
const UpsertPreferencesUseCase_1 = require("./application/use-cases/UpsertPreferencesUseCase");
const SaveMatchUseCase_1 = require("./application/use-cases/SaveMatchUseCase");
const ListSavedMatchesUseCase_1 = require("./application/use-cases/ListSavedMatchesUseCase");
const DeleteSavedMatchUseCase_1 = require("./application/use-cases/DeleteSavedMatchUseCase");
const UpdateWeightConfigUseCase_1 = require("./application/use-cases/UpdateWeightConfigUseCase");
const GetMatchStatsUseCase_1 = require("./application/use-cases/GetMatchStatsUseCase");
const GetWeightConfigUseCase_1 = require("./application/use-cases/GetWeightConfigUseCase");
function buildMatchingModule() {
    const repo = new PgMatchingRepositoryAdapter_1.PgMatchingRepositoryAdapter();
    const findWorkers = new FindWorkersUseCase_1.FindWorkersUseCase(repo);
    const findContractors = new FindContractorsUseCase_1.FindContractorsUseCase(repo);
    const getPreferences = new GetPreferencesUseCase_1.GetPreferencesUseCase(repo);
    const upsertPreferences = new UpsertPreferencesUseCase_1.UpsertPreferencesUseCase(repo);
    const saveMatch = new SaveMatchUseCase_1.SaveMatchUseCase(repo);
    const listSavedMatches = new ListSavedMatchesUseCase_1.ListSavedMatchesUseCase(repo);
    const deleteSavedMatch = new DeleteSavedMatchUseCase_1.DeleteSavedMatchUseCase(repo);
    const updateWeightConfig = new UpdateWeightConfigUseCase_1.UpdateWeightConfigUseCase(repo);
    const getMatchStats = new GetMatchStatsUseCase_1.GetMatchStatsUseCase(repo);
    const getWeightConfig = new GetWeightConfigUseCase_1.GetWeightConfigUseCase(repo);
    return {
        useCases: { findWorkers, findContractors, getPreferences, upsertPreferences, saveMatch, listSavedMatches, deleteSavedMatch, updateWeightConfig, getMatchStats, getWeightConfig }
    };
}
//# sourceMappingURL=index.js.map