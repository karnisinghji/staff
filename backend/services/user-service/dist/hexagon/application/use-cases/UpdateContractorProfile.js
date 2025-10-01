"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContractorProfileUseCase = void 0;
class UpdateContractorProfileUseCase {
    constructor(profiles) {
        this.profiles = profiles;
    }
    async execute(userId, fields) {
        if (!Object.keys(fields).length)
            throw new Error('No valid update fields provided');
        return this.profiles.updateContractorProfile(userId, fields);
    }
}
exports.UpdateContractorProfileUseCase = UpdateContractorProfileUseCase;
//# sourceMappingURL=UpdateContractorProfile.js.map