import { MatchingRepositoryPort, Preferences } from '../ports/outbound/MatchingRepositoryPort';
export declare class GetPreferencesUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(userId: string): Promise<Preferences | null>;
}
