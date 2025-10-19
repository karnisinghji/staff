import { Pool } from 'pg';

// This model represents a contractor's worker requirement
export interface ContractorRequirement {
    id?: number;
    contractorId: string;
    requiredWorkers: number;
    skills?: string[];
    location?: string;
    notes?: string;
    createdAt?: Date;
    lastSubmittedAt?: Date;
}

// SQL for table creation (migration)
export const createContractorRequirementsTableSQL = `
CREATE TABLE IF NOT EXISTS contractor_requirements (
  id SERIAL PRIMARY KEY,
  contractor_id VARCHAR(64) NOT NULL,
  required_workers INTEGER NOT NULL,
  skills TEXT[],
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_submitted_at TIMESTAMP DEFAULT NOW()
);
`;

// Insert a new requirement
export async function insertContractorRequirement(pool: Pool, req: ContractorRequirement) {
    const result = await pool.query(
        `INSERT INTO contractor_requirements (contractor_id, required_workers, skills, location, notes, last_submitted_at)
     VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
        [req.contractorId, req.requiredWorkers, req.skills, req.location, req.notes]
    );
    return result.rows[0];
}

// Fetch all requirements (optionally filter by contractor)
export async function getContractorRequirements(pool: Pool, contractorId?: string) {
    const baseQuery = `
        SELECT cr.*, u.name as contractor_name, u.email as contractor_email, u.phone as contractor_phone
        FROM contractor_requirements cr
        LEFT JOIN users u ON cr.contractor_id = u.id
    `;

    const result = contractorId
        ? await pool.query(baseQuery + 'WHERE cr.contractor_id = $1 ORDER BY cr.created_at DESC', [contractorId])
        : await pool.query(baseQuery + 'ORDER BY cr.created_at DESC');
    return result.rows;
}

// Get the most recent requirement for a specific contractor
export async function getLatestContractorRequirement(pool: Pool, contractorId: string) {
    const result = await pool.query(
        `SELECT * FROM contractor_requirements 
         WHERE contractor_id = $1 
         ORDER BY last_submitted_at DESC 
         LIMIT 1`,
        [contractorId]
    );
    return result.rows[0] || null;
}

// Check if contractor can submit (24 hours cooldown)
export async function canContractorSubmit(pool: Pool, contractorId: string): Promise<{ canSubmit: boolean; nextSubmitAt?: Date; hoursRemaining?: number }> {
    const latest = await getLatestContractorRequirement(pool, contractorId);

    if (!latest || !latest.last_submitted_at) {
        return { canSubmit: true };
    }

    const lastSubmittedAt = new Date(latest.last_submitted_at);
    const now = new Date();
    const hoursSinceLastSubmit = (now.getTime() - lastSubmittedAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastSubmit >= 24) {
        return { canSubmit: true };
    }

    const nextSubmitAt = new Date(lastSubmittedAt.getTime() + 24 * 60 * 60 * 1000);
    const hoursRemaining = Math.ceil(24 - hoursSinceLastSubmit);

    return {
        canSubmit: false,
        nextSubmitAt,
        hoursRemaining
    };
}

