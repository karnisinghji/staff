import { UserRepositoryPort } from '../ports/UserRepository';
import { ContactRepositoryPort } from '../ports/ContactRepository';
import { ProfileRepositoryPort } from '../ports/ProfileRepository';

export interface CompletenessBreakdownItem { field: string; present: boolean; }
export interface CompleteProfileResult {
    user: any; // sanitized user
    contacts: any[];
    workerProfile: any | null;
    contractorProfile: any | null;
    meta: {
        completeness: number;
        completenessBreakdown: CompletenessBreakdownItem[]; // legacy compatible array
    };
}

export class GetCompleteProfileUseCase {
    constructor(
        private users: UserRepositoryPort,
        private contacts: ContactRepositoryPort,
        private profiles: ProfileRepositoryPort
    ) { }

    async execute(userId: string): Promise<CompleteProfileResult | null> {
        const user = await this.users.findById(userId);
        if (!user) return null;

        const [contactRows, worker, contractor] = await Promise.all([
            this.contacts.findByOwner(userId),
            this.profiles.getWorkerProfile(userId),
            this.profiles.getContractorProfile(userId)
        ]);

        const sanitizedUser = user.toPrimitives();

        const { completeness, breakdownRecord } = this.computeCompleteness(sanitizedUser, worker, contractor, contactRows);
        const breakdownArray = Object.entries(breakdownRecord).map(([field, value]) => ({ field, present: value === 1 }));

        return {
            user: sanitizedUser,
            contacts: contactRows,
            workerProfile: worker,
            contractorProfile: contractor,
            meta: {
                completeness,
                completenessBreakdown: breakdownArray
            }
        };
    }

    private computeCompleteness(user: any, worker: any, contractor: any, contacts: any[]) {
        const breakdown: Record<string, number> = {};
        let total = 0;

        const consider = (key: string, present: boolean) => {
            breakdown[key] = present ? 1 : 0;
            total += present ? 1 : 0;
        };

        consider('username', !!user.username);
        consider('name', !!user.name);
        consider('location', !!user.location);

        // Check for contact information - either phone in user profile or contacts table
        const hasContactInfo = !!user.phone || !!user.email || contacts.length > 0;
        consider('contacts', hasContactInfo);

        if (worker) {
            // Check for either skillType (primary skill) OR skills array for skillset completeness
            const hasSkillset = !!worker.skillType || !!worker.skill_type || (Array.isArray(worker.skills) && worker.skills.length > 0);
            consider('worker_skillset', hasSkillset);
            consider('worker_experience', !!worker.experience_years);
        }
        if (contractor) {
            consider('contractor_company', !!contractor.company_name);
            consider('contractor_address', !!contractor.company_address);
        }

        const completeness = Object.keys(breakdown).length
            ? Math.round((total / Object.keys(breakdown).length) * 100)
            : 0;

        return { completeness, breakdownRecord: breakdown };
    }
}
