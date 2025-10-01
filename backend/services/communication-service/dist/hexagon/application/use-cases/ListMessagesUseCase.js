"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMessagesUseCase = void 0;
class ListMessagesUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(criteria) {
        return this.repo.list(criteria);
    }
}
exports.ListMessagesUseCase = ListMessagesUseCase;
//# sourceMappingURL=ListMessagesUseCase.js.map