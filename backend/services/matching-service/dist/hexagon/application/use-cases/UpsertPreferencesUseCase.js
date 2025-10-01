"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertPreferencesUseCase = void 0;
class UpsertPreferencesUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(prefs) {
        // TODO: validation & domain rules (distance bounds, weight config checks)
        await this.repo.upsertPreferences(prefs);
    }
}
exports.UpsertPreferencesUseCase = UpsertPreferencesUseCase;
//# sourceMappingURL=UpsertPreferencesUseCase.js.map