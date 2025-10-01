import { ProfileRepositoryPort } from '../ports/ProfileRepository';

export class UpdateContractorProfileUseCase {
    constructor(private profiles: ProfileRepositoryPort) { }
    async execute(userId: string, fields: Partial<{ companyName: string; companyDescription: string; }>) {
        if (!Object.keys(fields).length) throw new Error('No valid update fields provided');
        return this.profiles.updateContractorProfile(userId, fields);
    }
}
