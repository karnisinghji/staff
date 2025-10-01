"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindWorkersUseCase = void 0;
class FindWorkersUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(criteria) {
        // TODO: add validation + scoring enrichment pipeline
        return this.repo.findWorkers(criteria);
    }
}
exports.FindWorkersUseCase = FindWorkersUseCase;
//# sourceMappingURL=FindWorkersUseCase.js.map