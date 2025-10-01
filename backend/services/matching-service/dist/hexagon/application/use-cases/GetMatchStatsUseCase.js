"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMatchStatsUseCase = void 0;
class GetMatchStatsUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return this.repo.getStats();
    }
}
exports.GetMatchStatsUseCase = GetMatchStatsUseCase;
//# sourceMappingURL=GetMatchStatsUseCase.js.map