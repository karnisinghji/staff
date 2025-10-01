export interface SkillRepositoryPort {
    listSkillTypes(): Promise<string[]>;
}
