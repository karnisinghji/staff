import { MatchingRepositoryPort } from '../ports/outbound/MatchingRepositoryPort';

export class DeleteSavedMatchUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(userId: string, matchId: string): Promise<boolean> {
        return this.repo.deleteSavedMatch(userId, matchId);
    }
}
