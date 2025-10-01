"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSkillsUseCase = void 0;
class ListSkillsUseCase {
    constructor(skills) {
        this.skills = skills;
    }
    execute() { return this.skills.listSkillTypes(); }
}
exports.ListSkillsUseCase = ListSkillsUseCase;
//# sourceMappingURL=ListSkills.js.map