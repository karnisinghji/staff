"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
class UpdateUserUseCase {
    constructor(users) {
        this.users = users;
    }
    async execute(userId, fields) {
        if (!Object.keys(fields).length)
            throw new Error('No valid update fields provided');
        const updated = await this.users.updateUser(userId, fields);
        return updated.toPrimitives();
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
//# sourceMappingURL=UpdateUser.js.map