import { MatchingRepositoryPort, Preferences } from '../ports/outbound/MatchingRepositoryPort';

export class UpsertPreferencesUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(prefs: Preferences): Promise<void> {
        // TODO: validation & domain rules (distance bounds, weight config checks)
        await this.repo.upsertPreferences(prefs);
    }
}
