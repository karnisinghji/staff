import { MatchingRepositoryPort, SavedMatchPage } from '../ports/outbound/MatchingRepositoryPort';
export declare class ListSavedMatchesUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(userId: string, page: number, pageSize: number): Promise<SavedMatchPage>;
}
