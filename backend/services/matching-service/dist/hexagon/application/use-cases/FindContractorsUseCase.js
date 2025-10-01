"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindContractorsUseCase = void 0;
class FindContractorsUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(criteria) {
        // TODO: add validation + scoring enrichment pipeline
        return this.repo.findContractors(criteria);
    }
}
exports.FindContractorsUseCase = FindContractorsUseCase;
//# sourceMappingURL=FindContractorsUseCase.js.map