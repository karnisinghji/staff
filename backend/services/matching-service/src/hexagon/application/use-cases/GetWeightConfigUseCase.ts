import { MatchingRepositoryPort, WeightConfig } from '../ports/outbound/MatchingRepositoryPort';

export class GetWeightConfigUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }
    async execute(): Promise<WeightConfig> {
        return this.repo.getWeightConfig();
    }
}
