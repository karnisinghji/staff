import { Pool } from 'pg';
import { randomUUID } from 'crypto';
import { UserRepositoryPort, UpdateUserFields } from '../../application/ports/UserRepository';
import { ContactRepositoryPort, ContactRecord, CreateContactDTO, UpdateContactDTO } from '../../application/ports/ContactRepository';
import { ProfileRepositoryPort, WorkerProfileRecord, ContractorProfileRecord } from '../../application/ports/ProfileRepository';
import { SkillRepositoryPort } from '../../application/ports/SkillRepository';
import { PasswordResetRepositoryPort } from '../../application/ports/PasswordResetRepository';
import { PasswordResetTokenRepositoryPort, PasswordResetTokenRecord } from '../../application/ports/PasswordResetTokenRepository';
import { UserEntity } from '../../domain/entities/User';
import { NotFoundError, ConflictError } from '../../domain/errors/DomainErrors';

export class PgUserRepository implements UserRepositoryPort {
    constructor(private pool: Pool) { }
    async findById(id: string): Promise<UserEntity | null> {
        const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const r = res.rows[0];
        if (!r) return null;
        return new UserEntity({
            id: r.id,
            username: r.username,
            role: r.role,
            name: r.name,
            email: r.email,
            location: r.location,
            address: r.address,
            phone: r.phone,
            profileCompletedAt: r.profile_completed_at?.toISOString() || null,
            profileLockedAt: r.profile_locked_at?.toISOString() || null,
            createdAt: r.created_at
        });
    }
    async updateUser(id: string, fields: UpdateUserFields): Promise<UserEntity> {
        // First get the current user to check for registration field edge cases
        const currentUser = await this.findById(id);
        if (!currentUser) throw new NotFoundError('User not found');
        const current = currentUser.toPrimitives();

        const updates: string[] = [];
        const values: any[] = [];
        let idx = 1;
        if (fields.name !== undefined) { updates.push(`name = $${idx++}`); values.push(fields.name); }
        if (fields.phone !== undefined) { updates.push(`phone = $${idx++}`); values.push(fields.phone); }
        if (fields.location !== undefined) { updates.push(`location = $${idx++}`); values.push(fields.location); }
        if (fields.email !== undefined) { updates.push(`email = $${idx++}`); values.push(fields.email); }
        if (fields.address !== undefined) { updates.push(`address = $${idx++}`); values.push(fields.address); }
        if (fields.profileCompletedAt !== undefined) { updates.push(`profile_completed_at = $${idx++}`); values.push(fields.profileCompletedAt); }
        if (fields.profileLockedAt !== undefined) { updates.push(`profile_locked_at = $${idx++}`); values.push(fields.profileLockedAt); }
        updates.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);
        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`;

        try {
            const res = await this.pool.query(sql, values);
            if (!res.rows[0]) throw new NotFoundError('User not found');
            const r = res.rows[0];
            return new UserEntity({
                id: r.id, username: r.username, role: r.role, name: r.name,
                email: r.email, location: r.location, address: r.address, phone: r.phone,
                profileCompletedAt: r.profile_completed_at?.toISOString() || null,
                profileLockedAt: r.profile_locked_at?.toISOString() || null,
                createdAt: r.created_at
            });
        } catch (error: any) {
            // Handle duplicate email/phone constraint violations
            if (error.code === '23505') {
                // Check if user is trying to set their phone/email to their registration username
                const isSettingPhoneToUsername = fields.phone && fields.phone === current.username;
                const isSettingEmailToUsername = fields.email && fields.email === current.username;

                if (error.constraint === 'users_email_key' || error.constraint === 'users_email_unique' || error.detail?.includes('email')) {
                    if (isSettingEmailToUsername) {
                        // This is the user setting their email to their registration email - return current user
                        return currentUser;
                    }
                    throw new ConflictError('This email is already in use by another account');
                } else if (error.constraint === 'users_phone_unique' || error.detail?.includes('phone')) {
                    if (isSettingPhoneToUsername) {
                        // This is the user setting their phone to their registration phone - return current user
                        return currentUser;
                    }
                    throw new ConflictError('This phone number is already in use by another account');
                }
                throw new ConflictError('This information is already in use by another account');
            }
            throw error;
        }
    }
}

export class PgContactRepository implements ContactRepositoryPort {
    constructor(private pool: Pool) { }
    async findByOwner(userId: string): Promise<ContactRecord[]> {
        const res = await this.pool.query('SELECT * FROM contacts WHERE owner_id = $1 ORDER BY is_primary DESC, created_at ASC', [userId]);
        return res.rows;
    }
    async create(ownerId: string, dto: CreateContactDTO): Promise<ContactRecord> {
        // If making new primary for this type, demote existing primaries of same type
        if (dto.isPrimary) {
            await this.pool.query('UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = $2', [ownerId, dto.type]);
        }
        const strategy = (process.env.CONTACT_ID_STRATEGY || 'app').toLowerCase();
        let res;
        if (strategy === 'db') {
            // Rely on DB default (supports production Postgres default gen_random_uuid())
            res = await this.pool.query(
                'INSERT INTO contacts (owner_id, type, value, is_primary, is_verified) VALUES ($1,$2,$3,$4,$5) RETURNING *',
                [ownerId, dto.type, dto.value, dto.isPrimary || false, false]
            );
        } else {
            // Application-side generation (stable for pg-mem & deterministic tests)
            const id = randomUUID();
            res = await this.pool.query(
                'INSERT INTO contacts (id, owner_id, type, value, is_primary, is_verified) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
                [id, ownerId, dto.type, dto.value, dto.isPrimary || false, false]
            );
        }
        return res.rows[0];
    }
    async update(contactId: string, ownerId: string, dto: UpdateContactDTO): Promise<ContactRecord> {
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;
        if (dto.type !== undefined) { fields.push(`type = $${idx++}`); values.push(dto.type); }
        if (dto.value !== undefined) { fields.push(`value = $${idx++}`); values.push(dto.value); }
        if (dto.isPrimary !== undefined) {
            if (dto.isPrimary) {
                await this.pool.query('UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = (SELECT type FROM contacts WHERE id = $2)', [ownerId, contactId]);
            }
            fields.push(`is_primary = $${idx++}`); values.push(dto.isPrimary);
        }
        values.push(contactId, ownerId);
        const sql = `UPDATE contacts SET ${fields.join(', ')} WHERE id = $${idx++} AND owner_id = $${idx} RETURNING *`;
        const res = await this.pool.query(sql, values);
        if (!res.rows[0]) throw new NotFoundError('Contact not found');
        return res.rows[0];
    }
    async delete(contactId: string, ownerId: string): Promise<void> {
        const res = await this.pool.query('DELETE FROM contacts WHERE id = $1 AND owner_id = $2', [contactId, ownerId]);
        if (res.rowCount === 0) throw new NotFoundError('Contact not found');
    }
}

export class PgProfileRepository implements ProfileRepositoryPort {
    constructor(private pool: Pool) { }
    async getWorkerProfile(userId: string): Promise<WorkerProfileRecord | null> {
        // First, check and reset expired availability statuses
        await this.pool.query(`
            UPDATE worker_profiles 
            SET is_available = false, availability_expires_at = NULL, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $1 
            AND is_available = true 
            AND availability_expires_at IS NOT NULL 
            AND availability_expires_at < NOW()
        `, [userId]);

        // Then get the updated profile
        const res = await this.pool.query('SELECT * FROM worker_profiles WHERE user_id = $1', [userId]);
        return res.rows[0] || null;
    }
    async getContractorProfile(userId: string): Promise<ContractorProfileRecord | null> {
        const res = await this.pool.query('SELECT * FROM contractor_profiles WHERE owner_id = $1', [userId]);
        return res.rows[0] || null;
    }
    async updateWorkerProfile(userId: string, fields: Partial<{ skillType: string; experienceYears: number; /* hourlyRate: number; */ availability: string; description: string; isAvailable: boolean; }>): Promise<WorkerProfileRecord> {
        const map: Record<string, any> = {
            skillType: 'skill_type',
            experienceYears: 'experience_years',
            // hourlyRate: 'hourly_rate', // DISABLED - not required at this time
            availability: 'availability',
            description: 'description',
            isAvailable: 'is_available'
        };

        // Check if worker profile exists
        const existing = await this.getWorkerProfile(userId);

        if (existing) {
            // UPDATE existing record
            const updateSets: string[] = [];
            const values: any[] = [];
            let idx = 1;

            for (const k of Object.keys(fields)) {
                const col = map[k];
                if (col) {
                    updateSets.push(`${col} = $${idx++}`);
                    values.push((fields as any)[k]);
                }
            }

            // Handle availability expiry logic
            if (fields.isAvailable !== undefined) {
                if (fields.isAvailable === true) {
                    // Set expiry to 4 hours from now when becoming available
                    updateSets.push(`availability_expires_at = NOW() + INTERVAL '4 hours'`);
                } else {
                    // Clear expiry when becoming unavailable
                    updateSets.push(`availability_expires_at = NULL`);
                }
            }

            if (updateSets.length === 0) {
                return existing; // No changes to make
            }

            updateSets.push(`updated_at = CURRENT_TIMESTAMP`);
            values.push(userId); // for WHERE clause

            const sql = `
                UPDATE worker_profiles 
                SET ${updateSets.join(', ')}
                WHERE user_id = $${idx}
                RETURNING *
            `;

            const res = await this.pool.query(sql, values);
            if (!res.rows[0]) throw new NotFoundError('Failed to update worker profile');
            return res.rows[0];
        } else {
            // INSERT new record - ensure all required fields are present
            const columns: string[] = ['id', 'user_id'];
            const values: any[] = [userId, userId];
            let idx = 3;

            // Add skill_type with default if not provided
            columns.push('skill_type');
            values.push(fields.skillType || 'other');

            // Add other fields
            for (const k of Object.keys(fields)) {
                if (k === 'skillType') continue; // Already handled above
                const col = map[k];
                if (col) {
                    columns.push(col);
                    values.push((fields as any)[k]);
                }
            }

            const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

            const sql = `
                INSERT INTO worker_profiles (${columns.join(', ')}, created_at, updated_at)
                VALUES (${placeholders}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING *
            `;

            const res = await this.pool.query(sql, values);
            if (!res.rows[0]) throw new NotFoundError('Failed to create worker profile');
            return res.rows[0];
        }
    }
    async updateContractorProfile(userId: string, fields: Partial<{ companyName: string; companyDescription: string; }>): Promise<ContractorProfileRecord> {
        const map: Record<string, any> = {
            companyName: 'company_name',
            companyDescription: 'company_description'
        };
        const sets: string[] = [];
        const values: any[] = [];
        let idx = 1;
        for (const k of Object.keys(fields)) {
            const col = map[k];
            if (col) { sets.push(`${col} = $${idx++}`); values.push((fields as any)[k]); }
        }
        sets.push('updated_at = CURRENT_TIMESTAMP');
        values.push(userId);
        const sql = `UPDATE contractor_profiles SET ${sets.join(', ')} WHERE owner_id = $${idx} RETURNING *`;
        const res = await this.pool.query(sql, values);
        if (!res.rows[0]) throw new NotFoundError('Contractor profile not found');
        return res.rows[0];
    }
}

export class PgSkillRepository implements SkillRepositoryPort {
    constructor(private pool: Pool) { }
    async listSkillTypes(): Promise<string[]> {
        // Query the skill_type ENUM values from PostgreSQL system catalog
        try {
            const res = await this.pool.query(`
                SELECT enumlabel as name 
                FROM pg_enum 
                WHERE enumtypid = (
                    SELECT oid 
                    FROM pg_type 
                    WHERE typname = 'skill_type'
                )
                ORDER BY enumlabel ASC
            `);
            if (res.rowCount && res.rowCount > 0) {
                return res.rows.map(r => r.name);
            }
        } catch (error) {
            console.error('Error querying skill_type ENUM:', error);
        }

        // Fallback to distinct values from worker_profiles if ENUM query fails
        const distinct = await this.pool.query('SELECT DISTINCT skill_type FROM worker_profiles WHERE skill_type IS NOT NULL ORDER BY skill_type');
        return distinct.rows.map(r => r.skill_type);
    }
}

export class InMemoryPasswordResetRepository implements PasswordResetRepositoryPort {
    private tokens = new Map<string, { token: string; expiresAt: Date }>();
    constructor(private pool: Pool) { }
    async findUserByEmail(email: string) {
        const res = await this.pool.query('SELECT id, email FROM users WHERE email = $1', [email]);
        return res.rows[0] || null;
    }
    async generateToken(userId: string) {
        const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        this.tokens.set(userId, { token, expiresAt });
        return { token, expiresAt };
    }
}

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
export class PgPasswordResetTokenRepository implements PasswordResetTokenRepositoryPort {
    constructor(private pool: Pool) { }
    async create(userId: string, token: string, expiresAt: Date): Promise<void> {
        await this.pool.query(
            'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)',
            [userId, token, expiresAt]
        );
    }
    async findActiveByUser(userId: string, now: Date): Promise<PasswordResetTokenRecord | null> {
        const res = await this.pool.query(
            'SELECT user_id, token, expires_at, consumed_at FROM password_reset_tokens WHERE user_id = $1 AND consumed_at IS NULL AND expires_at > $2 ORDER BY created_at DESC LIMIT 1',
            [userId, now]
        );
        const r = res.rows[0];
        return r ? { userId: r.user_id, token: r.token, expiresAt: r.expires_at, consumedAt: r.consumed_at } : null;
    }
    async findByToken(token: string): Promise<PasswordResetTokenRecord | null> {
        const res = await this.pool.query(
            'SELECT user_id, token, expires_at, consumed_at FROM password_reset_tokens WHERE token = $1',
            [token]
        );
        const r = res.rows[0];
        return r ? { userId: r.user_id, token: r.token, expiresAt: r.expires_at, consumedAt: r.consumed_at } : null;
    }
    async markConsumed(token: string, at: Date): Promise<void> {
        await this.pool.query(
            'UPDATE password_reset_tokens SET consumed_at = $2 WHERE token = $1 AND consumed_at IS NULL',
            [token, at]
        );
    }
    async purgeExpired(now: Date): Promise<number> {
        const res = await this.pool.query('DELETE FROM password_reset_tokens WHERE expires_at <= $1 OR (consumed_at IS NOT NULL AND consumed_at < $1 - interval \'30 days\')', [now]);
        return res.rowCount || 0;
    }
}

// In-memory token repo for tests
export class InMemoryPasswordResetTokenRepository implements PasswordResetTokenRepositoryPort {
    private records: PasswordResetTokenRecord[] = [];
    async create(userId: string, token: string, expiresAt: Date): Promise<void> { this.records.push({ userId, token, expiresAt, consumedAt: null }); }
    async findActiveByUser(userId: string, now: Date): Promise<PasswordResetTokenRecord | null> {
        return this.records.filter(r => r.userId === userId && !r.consumedAt && r.expiresAt > now).sort((a, b) => b.expiresAt.getTime() - a.expiresAt.getTime())[0] || null;
    }
    async findByToken(token: string): Promise<PasswordResetTokenRecord | null> { return this.records.find(r => r.token === token) || null; }
    async markConsumed(token: string, at: Date): Promise<void> { const r = this.records.find(r => r.token === token); if (r && !r.consumedAt) r.consumedAt = at; }
    async purgeExpired(now: Date): Promise<number> { const before = this.records.length; this.records = this.records.filter(r => r.expiresAt > now); return before - this.records.length; }
}
