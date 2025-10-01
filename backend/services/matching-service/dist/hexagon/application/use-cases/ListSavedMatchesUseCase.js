"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSavedMatchesUseCase = void 0;
class ListSavedMatchesUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(userId, page, pageSize) {
        return this.repo.listSavedMatches(userId, { page, pageSize });
    }
}
exports.ListSavedMatchesUseCase = ListSavedMatchesUseCase;
//# sourceMappingURL=ListSavedMatchesUseCase.js.map