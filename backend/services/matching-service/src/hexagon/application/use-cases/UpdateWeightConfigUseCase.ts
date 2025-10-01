import { MatchingRepositoryPort, WeightConfig } from '../ports/outbound/MatchingRepositoryPort';

export class UpdateWeightConfigUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(config: WeightConfig): Promise<void> {
        // TODO: validation (no negative weights, sum constraints if any)
        await this.repo.updateWeightConfig(config);
    }
}
