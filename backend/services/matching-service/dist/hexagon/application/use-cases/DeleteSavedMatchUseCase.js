"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSavedMatchUseCase = void 0;
class DeleteSavedMatchUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(userId, matchId) {
        return this.repo.deleteSavedMatch(userId, matchId);
    }
}
exports.DeleteSavedMatchUseCase = DeleteSavedMatchUseCase;
//# sourceMappingURL=DeleteSavedMatchUseCase.js.map