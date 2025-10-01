"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const pg_1 = require("pg");
const logger_1 = require("../utils/logger");
class UserService {
    constructor() {
        // In-memory store for reset tokens (for demo only)
        this.resetTokens = {};
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
        });
    }
    // Find user by email
    async findUserByEmail(email) {
        try {
            const result = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return result.rows[0] || null;
        }
        catch (error) {
            logger_1.logger.error('Error finding user by email:', error);
            throw error;
        }
    }
    // Generate password reset token (valid for 1 hour)
    async generatePasswordResetToken(userId) {
        const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const expires = Date.now() + 60 * 60 * 1000; // 1 hour
        this.resetTokens[userId] = { token, expires };
        return token;
    }
    // User management
    async getUserById(id) {
        try {
            const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return result.rows[0] || null;
        }
        catch (error) {
            logger_1.logger.error('Error getting user by ID:', error);
            throw error;
        }
    }
    async updateUser(id, userData) {
        try {
            const updateFields = [];
            const updateValues = [];
            let paramCount = 1;
            if (userData.name !== undefined) {
                updateFields.push(`name = $${paramCount}`);
                updateValues.push(userData.name);
                paramCount++;
            }
            if (userData.phone !== undefined) {
                updateFields.push(`phone = $${paramCount}`);
                updateValues.push(userData.phone);
                paramCount++;
            }
            if (userData.location !== undefined) {
                updateFields.push(`location = $${paramCount}`);
                updateValues.push(userData.location);
                paramCount++;
            }
            updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
            updateValues.push(id);
            const query = `
        UPDATE users 
        SET ${updateFields.join(', ')} 
        WHERE id = $${paramCount} 
        RETURNING *
      `;
            const result = await this.pool.query(query, updateValues);
            if (result.rows.length === 0) {
                throw new Error('User not found');
            }
            return result.rows[0];
        }
        catch (error) {
            logger_1.logger.error('Error updating user:', error);
            throw error;
        }
    }
    // Worker profile management
    async getWorkerProfile(userId) {
        try {
            const result = await this.pool.query('SELECT * FROM worker_profiles WHERE user_id = $1', [userId]);
            return result.rows[0] || null;
        }
        catch (error) {
            logger_1.logger.error('Error getting worker profile:', error);
            throw error;
        }
    }
    async updateWorkerProfile(userId, profileData) {
        try {
            const updateFields = [];
            const updateValues = [];
            let paramCount = 1;
            if (profileData.skillType !== undefined) {
                updateFields.push(`skill_type = $${paramCount}`);
                updateValues.push(profileData.skillType);
                paramCount++;
            }
            if (profileData.experienceYears !== undefined) {
                updateFields.push(`experience_years = $${paramCount}`);
                updateValues.push(profileData.experienceYears);
                paramCount++;
            }
            if (profileData.hourlyRate !== undefined) {
                updateFields.push(`hourly_rate = $${paramCount}`);
                updateValues.push(profileData.hourlyRate);
                paramCount++;
            }
            if (profileData.availability !== undefined) {
                updateFields.push(`availability = $${paramCount}`);
                updateValues.push(profileData.availability);
                paramCount++;
            }
            if (profileData.description !== undefined) {
                updateFields.push(`description = $${paramCount}`);
                updateValues.push(profileData.description);
                paramCount++;
            }
            if (profileData.isAvailable !== undefined) {
                updateFields.push(`is_available = $${paramCount}`);
                updateValues.push(profileData.isAvailable);
                paramCount++;
            }
            updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
            updateValues.push(userId);
            const query = `
        UPDATE worker_profiles 
        SET ${updateFields.join(', ')} 
        WHERE user_id = $${paramCount} 
        RETURNING *
      `;
            const result = await this.pool.query(query, updateValues);
            if (result.rows.length === 0) {
                throw new Error('Worker profile not found');
            }
            return result.rows[0];
        }
        catch (error) {
            logger_1.logger.error('Error updating worker profile:', error);
            throw error;
        }
    }
    // Contractor profile management
    async getContractorProfile(userId) {
        try {
            const result = await this.pool.query('SELECT * FROM contractor_profiles WHERE owner_id = $1', [userId]);
            return result.rows[0] || null;
        }
        catch (error) {
            logger_1.logger.error('Error getting contractor profile:', error);
            throw error;
        }
    }
    async updateContractorProfile(userId, profileData) {
        try {
            const updateFields = [];
            const updateValues = [];
            let paramCount = 1;
            if (profileData.companyName !== undefined) {
                updateFields.push(`company_name = $${paramCount}`);
                updateValues.push(profileData.companyName);
                paramCount++;
            }
            if (profileData.companyDescription !== undefined) {
                updateFields.push(`company_description = $${paramCount}`);
                updateValues.push(profileData.companyDescription);
                paramCount++;
            }
            updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
            updateValues.push(userId);
            const query = `
                UPDATE contractor_profiles 
                SET ${updateFields.join(', ')} 
                WHERE owner_id = $${paramCount} 
                RETURNING *
            `;
            const result = await this.pool.query(query, updateValues);
            if (result.rows.length === 0) {
                throw new Error('Contractor profile not found');
            }
            return result.rows[0];
        }
        catch (error) {
            logger_1.logger.error('Error updating contractor profile:', error);
            throw error;
        }
    }
    // Contact management
    async getUserContacts(userId) {
        try {
            const contactsQuery = 'SELECT * FROM contacts WHERE owner_id = $1 ORDER BY is_primary DESC, created_at ASC';
            logger_1.logger.debug(`Executing contacts query: ${contactsQuery} with userId=${userId}`);
            const result = await this.pool.query(contactsQuery, [userId]);
            return result.rows;
        }
        catch (error) {
            logger_1.logger.error('Error getting user contacts:', error);
            throw error;
        }
    }
    async createContact(userId, contactData) {
        try {
            const { type, value, isPrimary = false } = contactData;
            // If setting as primary, unset other primary contacts of the same type
            if (isPrimary) {
                await this.pool.query('UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = $2', [userId, type]);
            }
            const result = await this.pool.query(`INSERT INTO contacts (owner_id, type, value, is_primary, is_verified) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`, [userId, type, value, isPrimary, false]);
            return result.rows[0];
        }
        catch (error) {
            logger_1.logger.error('Error creating contact:', error);
            throw error;
        }
    }
    async updateContact(contactId, userId, updates) {
        try {
            const updateFields = [];
            const updateValues = [];
            let paramCount = 1;
            if (updates.type !== undefined) {
                updateFields.push(`type = $${paramCount}`);
                updateValues.push(updates.type);
                paramCount++;
            }
            if (updates.value !== undefined) {
                updateFields.push(`value = $${paramCount}`);
                updateValues.push(updates.value);
                paramCount++;
            }
            if (updates.isPrimary !== undefined) {
                // If setting as primary, unset other primary contacts of the same type
                if (updates.isPrimary) {
                    await this.pool.query('UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = (SELECT type FROM contacts WHERE id = $2)', [userId, contactId]);
                }
                updateFields.push(`is_primary = $${paramCount}`);
                updateValues.push(updates.isPrimary);
                paramCount++;
            }
            updateValues.push(contactId, userId);
            const query = `
                UPDATE contacts 
                SET ${updateFields.join(', ')} 
                WHERE id = $${paramCount} AND owner_id = $${paramCount + 1}
                RETURNING *
            `;
            const result = await this.pool.query(query, updateValues);
            if (result.rows.length === 0) {
                throw new Error('Contact not found');
            }
            return result.rows[0];
        }
        catch (error) {
            logger_1.logger.error('Error updating contact:', error);
            throw error;
        }
    }
    async deleteContact(contactId, userId) {
        try {
            const result = await this.pool.query('DELETE FROM contacts WHERE id = $1 AND owner_id = $2', [contactId, userId]);
            if (result.rowCount === 0) {
                throw new Error('Contact not found');
            }
        }
        catch (error) {
            logger_1.logger.error('Error deleting contact:', error);
            throw error;
        }
    }
    // Get complete user profile
    async getCompleteUserProfile(userId) {
        try {
            const user = await this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const contacts = await this.getUserContacts(userId);
            let roleProfile = null;
            if (user.role === 'worker') {
                roleProfile = await this.getWorkerProfile(userId);
            }
            else if (user.role === 'contractor') {
                roleProfile = await this.getContractorProfile(userId);
            }
            // Compute profile completeness (simple heuristic)
            // Base fields considered for all users
            const completenessChecks = [
                ['name', user.name],
                ['location', user.location],
            ];
            // Include phone if user has provided or could provide
            completenessChecks.push(['phone', user.phone]);
            if (user.role === 'worker') {
                const wp = roleProfile || {};
                completenessChecks.push(['skill_type', wp.skill_type]);
                completenessChecks.push(['experience_years', wp.experience_years]);
                completenessChecks.push(['hourly_rate', wp.hourly_rate]);
                completenessChecks.push(['availability', wp.availability]);
                completenessChecks.push(['description', wp.description]);
            }
            else if (user.role === 'contractor') {
                const cp = roleProfile || {};
                completenessChecks.push(['company_name', cp.company_name]);
                completenessChecks.push(['company_description', cp.company_description]);
            }
            // Contacts: count having at least one primary contact (email or phone)
            completenessChecks.push(['primary_contact', contacts.some((c) => c.is_primary || c.isPrimary)]);
            const total = completenessChecks.length;
            const filled = completenessChecks.filter(([, value]) => value !== undefined && value !== null && value !== '').length;
            const completeness = Math.round((filled / Math.max(total, 1)) * 100);
            // Sanitize sensitive user fields before returning
            const { password_hash, passwordHash, reset_token, resetToken, ...safeUser } = user;
            return {
                user: safeUser,
                contacts,
                profile: roleProfile,
                meta: {
                    completeness,
                    completenessBreakdown: completenessChecks.map(([field, value]) => ({ field, present: !!(value !== undefined && value !== null && value !== '') }))
                }
            };
        }
        catch (error) {
            logger_1.logger.error('Error getting complete user profile:', error);
            throw error;
        }
    }
    // Skills list (could later come from DB table)
    async getSkillTypes() {
        // For now a static curated list; ensure sorted and unique
        return [
            'carpentry', 'plumbing', 'electrical', 'masonry', 'painting', 'landscaping',
            'roofing', 'flooring', 'hvac', 'drywall', 'framing', 'welding'
        ].sort();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map