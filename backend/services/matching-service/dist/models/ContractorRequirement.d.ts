import { Pool } from 'pg';
export interface ContractorRequirement {
    id?: number;
    contractorId: string;
    requiredWorkers: number;
    skills?: string[];
    location?: string;
    notes?: string;
    createdAt?: Date;
}
export declare const createContractorRequirementsTableSQL = "\nCREATE TABLE IF NOT EXISTS contractor_requirements (\n  id SERIAL PRIMARY KEY,\n  contractor_id VARCHAR(64) NOT NULL,\n  required_workers INTEGER NOT NULL,\n  skills TEXT[],\n  location TEXT,\n  notes TEXT,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n";
export declare function insertContractorRequirement(pool: Pool, req: ContractorRequirement): Promise<any>;
export declare function getContractorRequirements(pool: Pool, contractorId?: string): Promise<any[]>;
