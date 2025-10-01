"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageUseCase = void 0;
const uuid_1 = require("uuid");
class SendMessageUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(cmd) {
        const message = {
            id: (0, uuid_1.v4)(),
            fromUserId: cmd.fromUserId,
            toUserId: cmd.toUserId,
            body: cmd.body,
            createdAt: new Date(),
            readAt: null
        };
        await this.repo.save(message);
        return message;
    }
}
exports.SendMessageUseCase = SendMessageUseCase;
//# sourceMappingURL=SendMessageUseCase.js.map