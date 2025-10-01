import { MatchingRepositoryPort, WeightConfig } from '../ports/outbound/MatchingRepositoryPort';
export declare class GetWeightConfigUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(): Promise<WeightConfig>;
}
