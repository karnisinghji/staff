import { MatchingRepositoryPort } from '../ports/outbound/MatchingRepositoryPort';
export declare class DeleteSavedMatchUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(userId: string, matchId: string): Promise<boolean>;
}
