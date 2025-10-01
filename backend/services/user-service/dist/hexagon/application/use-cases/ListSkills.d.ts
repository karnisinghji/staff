import { SkillRepositoryPort } from '../ports/SkillRepository';
export declare class ListSkillsUseCase {
    private skills;
    constructor(skills: SkillRepositoryPort);
    execute(): Promise<string[]>;
}
