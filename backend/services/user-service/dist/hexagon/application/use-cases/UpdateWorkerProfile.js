"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkerProfileUseCase = void 0;
class UpdateWorkerProfileUseCase {
    constructor(profiles) {
        this.profiles = profiles;
    }
    async execute(userId, fields) {
        if (!Object.keys(fields).length)
            throw new Error('No valid update fields provided');
        return this.profiles.updateWorkerProfile(userId, fields);
    }
}
exports.UpdateWorkerProfileUseCase = UpdateWorkerProfileUseCase;
//# sourceMappingURL=UpdateWorkerProfile.js.map