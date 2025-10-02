export interface WorkerProfileRecord {
    user_id: string;
    skill_type?: string | null;
    experience_years?: number | null;
    hourly_rate?: number | null;
    availability?: string | null;
    description?: string | null;
    is_available?: boolean | null;
}
export interface ContractorProfileRecord {
    owner_id: string;
    company_name?: string | null;
    company_description?: string | null;
}
export interface ProfileRepositoryPort {
    getWorkerProfile(userId: string): Promise<WorkerProfileRecord | null>;
    getContractorProfile(userId: string): Promise<ContractorProfileRecord | null>;
    updateWorkerProfile(userId: string, fields: Partial<{ skillType: string; experienceYears: number; /* hourlyRate: number; */ availability: string; description: string; isAvailable: boolean; }>): Promise<WorkerProfileRecord>;
    updateContractorProfile(userId: string, fields: Partial<{ companyName: string; companyDescription: string; }>): Promise<ContractorProfileRecord>;
}
