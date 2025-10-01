import { UserRepositoryPort } from '../ports/UserRepository';
import { ContactRepositoryPort } from '../ports/ContactRepository';
import { ProfileRepositoryPort } from '../ports/ProfileRepository';
export interface CompletenessBreakdownItem {
    field: string;
    present: boolean;
}
export interface CompleteProfileResult {
    user: any;
    contacts: any[];
    workerProfile: any | null;
    contractorProfile: any | null;
    meta: {
        completeness: number;
        completenessBreakdown: CompletenessBreakdownItem[];
    };
}
export declare class GetCompleteProfileUseCase {
    private users;
    private contacts;
    private profiles;
    constructor(users: UserRepositoryPort, contacts: ContactRepositoryPort, profiles: ProfileRepositoryPort);
    execute(userId: string): Promise<CompleteProfileResult | null>;
    private computeCompleteness;
}
