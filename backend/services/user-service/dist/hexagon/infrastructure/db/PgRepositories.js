"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPasswordResetTokenRepository = exports.PgPasswordResetTokenRepository = exports.InMemoryPasswordResetRepository = exports.PgSkillRepository = exports.PgProfileRepository = exports.PgContactRepository = exports.PgUserRepository = void 0;
const crypto_1 = require("crypto");
const User_1 = require("../../domain/entities/User");
const DomainErrors_1 = require("../../domain/errors/DomainErrors");
class PgUserRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findById(id) {
        const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const r = res.rows[0];
        if (!r)
            return null;
        return new User_1.UserEntity({
            id: r.id,
            username: r.username,
            role: r.role,
            name: r.name,
            location: r.location,
            phone: r.phone,
            createdAt: r.created_at
        });
    }
    async updateUser(id, fields) {
        const updates = [];
        const values = [];
        let idx = 1;
        if (fields.name !== undefined) {
            updates.push(`name = $${idx++}`);
            values.push(fields.name);
        }
        if (fields.phone !== undefined) {
            updates.push(`phone = $${idx++}`);
            values.push(fields.phone);
        }
        if (fields.location !== undefined) {
            updates.push(`location = $${idx++}`);
            values.push(fields.location);
        }
        if (fields.email !== undefined) {
            updates.push(`email = $${idx++}`);
            values.push(fields.email);
        }
        if (fields.address !== undefined) {
            updates.push(`address = $${idx++}`);
            values.push(fields.address);
        }
        updates.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);
        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`;
        try {
            const res = await this.pool.query(sql, values);
            if (!res.rows[0])
                throw new DomainErrors_1.NotFoundError('User not found');
            const r = res.rows[0];
            return new User_1.UserEntity({
                id: r.id, username: r.username, role: r.role, name: r.name,
                location: r.location, phone: r.phone, createdAt: r.created_at
            });
        }
        catch (error) {
            // Handle duplicate email/phone constraint violations
            if (error.code === '23505') {
                if (error.constraint === 'users_email_key' || error.constraint === 'users_email_unique' || error.detail?.includes('email')) {
                    throw new DomainErrors_1.ConflictError('This email is already in use by another account');
                }
                else if (error.constraint === 'users_phone_unique' || error.detail?.includes('phone')) {
                    throw new DomainErrors_1.ConflictError('This phone number is already in use by another account');
                }
                throw new DomainErrors_1.ConflictError('This information is already in use by another account');
            }
            throw error;
        }
    }
}
exports.PgUserRepository = PgUserRepository;
class PgContactRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findByOwner(userId) {
        const res = await this.pool.query('SELECT * FROM contacts WHERE owner_id = $1 ORDER BY is_primary DESC, created_at ASC', [userId]);
        return res.rows;
    }
    async create(ownerId, dto) {
        // If making new primary for this type, demote existing primaries of same type
        if (dto.isPrimary) {
            await this.pool.query('UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = $2', [ownerId, dto.type]);
        }
        const strategy = (process.env.CONTACT_ID_STRATEGY || 'app').toLowerCase();
        let res;
        if (strategy === 'db') {
            // Rely on DB default (supports production Postgres default gen_random_uuid())
            res = await this.pool.query('INSERT INTO contacts (owner_id, type, value, is_primary, is_verified) VALUES ($1,$2,$3,$4,$5) RETURNING *', [ownerId, dto.type, dto.value, dto.isPrimary || false, false]);
        }
        else {
            // Application-side generation (stable for pg-mem & deterministic tests)
            const id = (0, crypto_1.randomUUID)();
            res = await this.pool.query('INSERT INTO contacts (id, owner_id, type, value, is_primary, is_verified) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id, ownerId, dto.type, dto.value, dto.isPrimary || false, false]);
        }
        return res.rows[0];
    }
    async update(contactId, ownerId, dto) {
        const fields = [];
        const values = [];
        let idx = 1;
        if (dto.type !== undefined) {
            fields.push(`type = $${idx++}`);
            values.push(dto.type);
        }
        if (dto.value !== undefined) {
            fields.push(`value = $${idx++}`);
            values.push(dto.value);
        }
        if (dto.isPrimary !== undefined) {
            if (dto.isPrimary) {
                await this.pool.query('UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = (SELECT type FROM contacts WHERE id = $2)', [ownerId, contactId]);
            }
            fields.push(`is_primary = $${idx++}`);
            values.push(dto.isPrimary);
        }
        values.push(contactId, ownerId);
        const sql = `UPDATE contacts SET ${fields.join(', ')} WHERE id = $${idx++} AND owner_id = $${idx} RETURNING *`;
        const res = await this.pool.query(sql, values);
        if (!res.rows[0])
            throw new DomainErrors_1.NotFoundError('Contact not found');
        return res.rows[0];
    }
    async delete(contactId, ownerId) {
        const res = await this.pool.query('DELETE FROM contacts WHERE id = $1 AND owner_id = $2', [contactId, ownerId]);
        if (res.rowCount === 0)
            throw new DomainErrors_1.NotFoundError('Contact not found');
    }
}
exports.PgContactRepository = PgContactRepository;
class PgProfileRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async getWorkerProfile(userId) {
        const res = await this.pool.query('SELECT * FROM worker_profiles WHERE user_id = $1', [userId]);
        return res.rows[0] || null;
    }
    async getContractorProfile(userId) {
        const res = await this.pool.query('SELECT * FROM contractor_profiles WHERE owner_id = $1', [userId]);
        return res.rows[0] || null;
    }
    async updateWorkerProfile(userId, fields) {
        const map = {
            skillType: 'skill_type',
            experienceYears: 'experience_years',
            hourlyRate: 'hourly_rate',
            availability: 'availability',
            description: 'description',
            isAvailable: 'is_available'
        };
        // Build column names and values for UPSERT
        const columns = ['user_id'];
        const values = [userId];
        const updateSets = [];
        let idx = 2;
        for (const k of Object.keys(fields)) {
            const col = map[k];
            if (col) {
                columns.push(col);
                values.push(fields[k]);
                updateSets.push(`${col} = $${idx++}`);
            }
        }
        // Use INSERT ... ON CONFLICT UPDATE (UPSERT)
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        updateSets.push('updated_at = CURRENT_TIMESTAMP');
        const sql = `
            INSERT INTO worker_profiles (${columns.join(', ')}, created_at, updated_at)
            VALUES (${placeholders}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id) 
            DO UPDATE SET ${updateSets.join(', ')}
            RETURNING *
        `;
        const res = await this.pool.query(sql, values);
        if (!res.rows[0])
            throw new DomainErrors_1.NotFoundError('Failed to create or update worker profile');
        return res.rows[0];
    }
    async updateContractorProfile(userId, fields) {
        const map = {
            companyName: 'company_name',
            companyDescription: 'company_description'
        };
        const sets = [];
        const values = [];
        let idx = 1;
        for (const k of Object.keys(fields)) {
            const col = map[k];
            if (col) {
                sets.push(`${col} = $${idx++}`);
                values.push(fields[k]);
            }
        }
        sets.push('updated_at = CURRENT_TIMESTAMP');
        values.push(userId);
        const sql = `UPDATE contractor_profiles SET ${sets.join(', ')} WHERE owner_id = $${idx} RETURNING *`;
        const res = await this.pool.query(sql, values);
        if (!res.rows[0])
            throw new DomainErrors_1.NotFoundError('Contractor profile not found');
        return res.rows[0];
    }
}
exports.PgProfileRepository = PgProfileRepository;
class PgSkillRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async listSkillTypes() {
        // Assuming a static reference table `skill_types` (fallback to distinct skill_type from worker_profiles if absent)
        try {
            const res = await this.pool.query('SELECT name FROM skill_types ORDER BY name ASC');
            if (res.rowCount)
                return res.rows.map(r => r.name);
        }
        catch { /* fall back */ }
        const distinct = await this.pool.query('SELECT DISTINCT skill_type FROM worker_profiles WHERE skill_type IS NOT NULL');
        return distinct.rows.map(r => r.skill_type).sort();
    }
}
exports.PgSkillRepository = PgSkillRepository;
class InMemoryPasswordResetRepository {
    constructor(pool) {
        this.pool = pool;
        this.tokens = new Map();
    }
    async findUserByEmail(email) {
        const res = await this.pool.query('SELECT id, email FROM users WHERE email = $1', [email]);
        return res.rows[0] || null;
    }
    async generateToken(userId) {
        const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        this.tokens.set(userId, { token, expiresAt });
        return { token, expiresAt };
    }
}
exports.InMemoryPasswordResetRepository = InMemoryPasswordResetRepository;
// Persistent password reset token repository (Postgres)
// DDL (reference):
// CREATE TABLE IF NOT EXISTS password_reset_tokens (
//   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//   token text UNIQUE NOT NULL,
//   expires_at timestamptz NOT NULL,
//   consumed_at timestamptz NULL,
//   created_at timestamptz NOT NULL DEFAULT now()
// );
// CREATE INDEX IF NOT EXISTS idx_prt_user_active ON password_reset_tokens(user_id) WHERE consumed_at IS NULL AND expires_at > now();
class PgPasswordResetTokenRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async create(userId, token, expiresAt) {
        await this.pool.query('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)', [userId, token, expiresAt]);
    }
    async findActiveByUser(userId, now) {
        const res = await this.pool.query('SELECT user_id, token, expires_at, consumed_at FROM password_reset_tokens WHERE user_id = $1 AND consumed_at IS NULL AND expires_at > $2 ORDER BY created_at DESC LIMIT 1', [userId, now]);
        const r = res.rows[0];
        return r ? { userId: r.user_id, token: r.token, expiresAt: r.expires_at, consumedAt: r.consumed_at } : null;
    }
    async findByToken(token) {
        const res = await this.pool.query('SELECT user_id, token, expires_at, consumed_at FROM password_reset_tokens WHERE token = $1', [token]);
        const r = res.rows[0];
        return r ? { userId: r.user_id, token: r.token, expiresAt: r.expires_at, consumedAt: r.consumed_at } : null;
    }
    async markConsumed(token, at) {
        await this.pool.query('UPDATE password_reset_tokens SET consumed_at = $2 WHERE token = $1 AND consumed_at IS NULL', [token, at]);
    }
    async purgeExpired(now) {
        const res = await this.pool.query('DELETE FROM password_reset_tokens WHERE expires_at <= $1 OR (consumed_at IS NOT NULL AND consumed_at < $1 - interval \'30 days\')', [now]);
        return res.rowCount || 0;
    }
}
exports.PgPasswordResetTokenRepository = PgPasswordResetTokenRepository;
// In-memory token repo for tests
class InMemoryPasswordResetTokenRepository {
    constructor() {
        this.records = [];
    }
    async create(userId, token, expiresAt) { this.records.push({ userId, token, expiresAt, consumedAt: null }); }
    async findActiveByUser(userId, now) {
        return this.records.filter(r => r.userId === userId && !r.consumedAt && r.expiresAt > now).sort((a, b) => b.expiresAt.getTime() - a.expiresAt.getTime())[0] || null;
    }
    async findByToken(token) { return this.records.find(r => r.token === token) || null; }
    async markConsumed(token, at) { const r = this.records.find(r => r.token === token); if (r && !r.consumedAt)
        r.consumedAt = at; }
    async purgeExpired(now) { const before = this.records.length; this.records = this.records.filter(r => r.expiresAt > now); return before - this.records.length; }
}
exports.InMemoryPasswordResetTokenRepository = InMemoryPasswordResetTokenRepository;
//# sourceMappingURL=PgRepositories.js.map