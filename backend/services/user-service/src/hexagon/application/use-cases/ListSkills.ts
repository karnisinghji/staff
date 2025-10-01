import { SkillRepositoryPort } from '../ports/SkillRepository';

export class ListSkillsUseCase {
    constructor(private skills: SkillRepositoryPort) { }
    execute() { return this.skills.listSkillTypes(); }
}
