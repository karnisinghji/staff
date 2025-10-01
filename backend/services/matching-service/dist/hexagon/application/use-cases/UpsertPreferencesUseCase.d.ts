import { MatchingRepositoryPort, Preferences } from '../ports/outbound/MatchingRepositoryPort';
export declare class UpsertPreferencesUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(prefs: Preferences): Promise<void>;
}
