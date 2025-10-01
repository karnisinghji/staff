"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPreferencesUseCase = void 0;
class GetPreferencesUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(userId) {
        return this.repo.getPreferences(userId);
    }
}
exports.GetPreferencesUseCase = GetPreferencesUseCase;
//# sourceMappingURL=GetPreferencesUseCase.js.map