import { ProfileRepositoryPort } from '../ports/ProfileRepository';
export declare class UpdateContractorProfileUseCase {
    private profiles;
    constructor(profiles: ProfileRepositoryPort);
    execute(userId: string, fields: Partial<{
        companyName: string;
        companyDescription: string;
    }>): Promise<import("../ports/ProfileRepository").ContractorProfileRecord>;
}
