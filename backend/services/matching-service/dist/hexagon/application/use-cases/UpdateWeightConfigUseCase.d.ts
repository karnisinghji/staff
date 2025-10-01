import { MatchingRepositoryPort, WeightConfig } from '../ports/outbound/MatchingRepositoryPort';
export declare class UpdateWeightConfigUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(config: WeightConfig): Promise<void>;
}
