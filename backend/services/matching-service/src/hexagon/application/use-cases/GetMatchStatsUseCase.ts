import { MatchingRepositoryPort, MatchStats } from '../ports/outbound/MatchingRepositoryPort';

export class GetMatchStatsUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(): Promise<MatchStats> {
        return this.repo.getStats();
    }
}
