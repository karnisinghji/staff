"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWeightConfigUseCase = void 0;
class UpdateWeightConfigUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(config) {
        // TODO: validation (no negative weights, sum constraints if any)
        await this.repo.updateWeightConfig(config);
    }
}
exports.UpdateWeightConfigUseCase = UpdateWeightConfigUseCase;
//# sourceMappingURL=UpdateWeightConfigUseCase.js.map