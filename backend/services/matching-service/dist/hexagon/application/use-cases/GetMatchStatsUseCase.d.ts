import { MatchingRepositoryPort, MatchStats } from '../ports/outbound/MatchingRepositoryPort';
export declare class GetMatchStatsUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(): Promise<MatchStats>;
}
