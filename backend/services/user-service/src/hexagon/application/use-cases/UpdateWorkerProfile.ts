import { ProfileRepositoryPort } from '../ports/ProfileRepository';

export class UpdateWorkerProfileUseCase {
    constructor(private profiles: ProfileRepositoryPort) { }
    async execute(userId: string, fields: Partial<{ skillType: string; experienceYears: number; /* hourlyRate: number; */ availability: string; description: string; isAvailable: boolean; }>) {
        if (!Object.keys(fields).length) throw new Error('No valid update fields provided');
        return this.profiles.updateWorkerProfile(userId, fields);
    }
}
