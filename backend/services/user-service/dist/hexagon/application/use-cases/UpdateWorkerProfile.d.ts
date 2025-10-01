import { ProfileRepositoryPort } from '../ports/ProfileRepository';
export declare class UpdateWorkerProfileUseCase {
    private profiles;
    constructor(profiles: ProfileRepositoryPort);
    execute(userId: string, fields: Partial<{
        skillType: string;
        experienceYears: number;
        hourlyRate: number;
        availability: string;
        description: string;
        isAvailable: boolean;
    }>): Promise<import("../ports/ProfileRepository").WorkerProfileRecord>;
}
