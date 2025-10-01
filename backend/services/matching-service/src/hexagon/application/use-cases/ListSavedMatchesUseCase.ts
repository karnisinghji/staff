import { MatchingRepositoryPort, SavedMatchPage } from '../ports/outbound/MatchingRepositoryPort';

export class ListSavedMatchesUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(userId: string, page: number, pageSize: number): Promise<SavedMatchPage> {
        return this.repo.listSavedMatches(userId, { page, pageSize });
    }
}
