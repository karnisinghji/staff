import { MatchingRepositoryPort, Preferences } from '../ports/outbound/MatchingRepositoryPort';

export class GetPreferencesUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(userId: string): Promise<Preferences | null> {
        return this.repo.getPreferences(userId);
    }
}
