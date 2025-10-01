import { MatchingRepositoryPort, Match } from '../ports/outbound/MatchingRepositoryPort';
export declare class SaveMatchUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(match: Match): Promise<void>;
}
