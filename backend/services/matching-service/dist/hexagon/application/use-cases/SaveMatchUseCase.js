"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveMatchUseCase = void 0;
class SaveMatchUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(match) {
        // TODO: domain validation (ensure participants differ, etc.)
        await this.repo.saveMatch(match);
    }
}
exports.SaveMatchUseCase = SaveMatchUseCase;
//# sourceMappingURL=SaveMatchUseCase.js.map