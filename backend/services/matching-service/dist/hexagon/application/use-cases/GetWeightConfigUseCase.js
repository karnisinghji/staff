"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWeightConfigUseCase = void 0;
class GetWeightConfigUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return this.repo.getWeightConfig();
    }
}
exports.GetWeightConfigUseCase = GetWeightConfigUseCase;
//# sourceMappingURL=GetWeightConfigUseCase.js.map