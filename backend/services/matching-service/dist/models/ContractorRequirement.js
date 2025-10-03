"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContractorRequirementsTableSQL = void 0;
exports.insertContractorRequirement = insertContractorRequirement;
exports.getContractorRequirements = getContractorRequirements;
// SQL for table creation (migration)
exports.createContractorRequirementsTableSQL = `
CREATE TABLE IF NOT EXISTS contractor_requirements (
  id SERIAL PRIMARY KEY,
  contractor_id VARCHAR(64) NOT NULL,
  required_workers INTEGER NOT NULL,
  skills TEXT[],
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
`;
// Insert a new requirement
async function insertContractorRequirement(pool, req) {
    const result = await pool.query(`INSERT INTO contractor_requirements (contractor_id, required_workers, skills, location, notes)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`, [req.contractorId, req.requiredWorkers, req.skills, req.location, req.notes]);
    return result.rows[0];
}
// Fetch all requirements (optionally filter by contractor)
async function getContractorRequirements(pool, contractorId) {
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
//# sourceMappingURL=ContractorRequirement.js.map