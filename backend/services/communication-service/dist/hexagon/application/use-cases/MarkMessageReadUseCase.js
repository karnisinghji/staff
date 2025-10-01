"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkMessageReadUseCase = void 0;
class MarkMessageReadUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(messageId, readerId) {
        return this.repo.markRead(messageId, readerId, new Date());
    }
}
exports.MarkMessageReadUseCase = MarkMessageReadUseCase;
//# sourceMappingURL=MarkMessageReadUseCase.js.map