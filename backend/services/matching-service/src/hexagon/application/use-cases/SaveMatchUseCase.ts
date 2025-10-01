import { MatchingRepositoryPort, Match } from '../ports/outbound/MatchingRepositoryPort';

export class SaveMatchUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(match: Match): Promise<void> {
        // TODO: domain validation (ensure participants differ, etc.)
        await this.repo.saveMatch(match);
    }
}
