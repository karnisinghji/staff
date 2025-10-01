import { Pool } from 'pg';
import { logger } from '../utils/logger';
import {
    User,
    WorkerProfile,
    ContractorProfile,
    Contact,
    UpdateUserRequest,
    UpdateWorkerProfileRequest,
    UpdateContractorProfileRequest,
    CreateContactRequest
} from '../types';

export class UserService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
        });
    }

    // User management
    async getUserById(id: string): Promise<User | null> {
        try {
            const result = await this.pool.query(
                'SELECT * FROM users WHERE id = $1',
                [id]
            );
            return result.rows[0] || null;
        } catch (error) {
            logger.error('Error getting user by ID:', error);
            throw error;
        }
    }

    async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
        try {
            // Check for duplicate email
            if (userData.email) {
                const emailCheck = await this.pool.query(
                    'SELECT id FROM users WHERE email = $1 AND id <> $2',
                    [userData.email, id]
                );
                if (emailCheck.rows.length > 0) {
                    throw new Error('Email is already in use by another user.');
                }
            }
            // Check for duplicate phone
            if (userData.phone) {
                const phoneCheck = await this.pool.query(
                    'SELECT id FROM users WHERE phone = $1 AND id <> $2',
                    [userData.phone, id]
                );
                if (phoneCheck.rows.length > 0) {
                    throw new Error('Phone number is already in use by another user.');
                }
            }
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

            if (userData.address !== undefined) {
                updateFields.push(`address = $${paramCount}`);
                updateValues.push(userData.address);
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
        } catch (error) {
            logger.error('Error updating user:', error);
            throw error;
        }
    }

    // Worker profile management
    async getWorkerProfile(userId: string): Promise<WorkerProfile | null> {
        try {
            const result = await this.pool.query(
                'SELECT * FROM worker_profiles WHERE user_id = $1',
                [userId]
            );
            return result.rows[0] || null;
        } catch (error) {
            logger.error('Error getting worker profile:', error);
            throw error;
        }
    }

    async updateWorkerProfile(userId: string, profileData: UpdateWorkerProfileRequest): Promise<WorkerProfile> {
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
        } catch (error) {
            logger.error('Error updating worker profile:', error);
            throw error;
        }
    }

    // Contractor profile management
    async getContractorProfile(userId: string): Promise<ContractorProfile | null> {
        try {
            const result = await this.pool.query(
                'SELECT * FROM contractor_profiles WHERE owner_id = $1',
                [userId]
            );
            return result.rows[0] || null;
        } catch (error) {
            logger.error('Error getting contractor profile:', error);
            throw error;
        }
    }

    async updateContractorProfile(userId: string, profileData: UpdateContractorProfileRequest): Promise<ContractorProfile> {
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
        } catch (error) {
            logger.error('Error updating contractor profile:', error);
            throw error;
        }
    }

    // Contact management
    async getUserContacts(userId: string): Promise<Contact[]> {
        try {
            const result = await this.pool.query(
                'SELECT * FROM contacts WHERE owner_id = $1 ORDER BY is_primary DESC, created_at ASC',
                [userId]
            );
            return result.rows;
        } catch (error) {
            logger.error('Error getting user contacts:', error);
            throw error;
        }
    }

    async createContact(userId: string, contactData: CreateContactRequest): Promise<Contact> {
        try {
            const { type, value, isPrimary = false } = contactData;

            // If setting as primary, unset other primary contacts of the same type

            if (isPrimary) {
                await this.pool.query(
                    'UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = $2',
                    [userId, type]
                );
            }


            const result = await this.pool.query(
                `INSERT INTO contacts (owner_id, type, value, is_primary, is_verified) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
                [userId, type, value, isPrimary, false]
            );

            return result.rows[0];
        } catch (error) {
            logger.error('Error creating contact:', error);
            throw error;
        }
    }

    async updateContact(contactId: string, userId: string, updates: Partial<CreateContactRequest>): Promise<Contact> {
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
                    await this.pool.query(
                        'UPDATE contacts SET is_primary = FALSE WHERE owner_id = $1 AND type = (SELECT type FROM contacts WHERE id = $2)',
                        [userId, contactId]
                    );
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
        } catch (error) {
            logger.error('Error updating contact:', error);
            throw error;
        }
    }

    async deleteContact(contactId: string, userId: string): Promise<void> {
        try {
            const result = await this.pool.query(
                'DELETE FROM contacts WHERE id = $1 AND owner_id = $2',
                [contactId, userId]
            );

            if (result.rowCount === 0) {
                throw new Error('Contact not found');
            }
        } catch (error) {
            logger.error('Error deleting contact:', error);
            throw error;
        }
    }

    // Get complete user profile
    async getCompleteUserProfile(userId: string): Promise<any> {
        try {
            const user = await this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const contacts = await this.getUserContacts(userId);

            let roleProfile = null;
            if (user.role === 'worker') {
                roleProfile = await this.getWorkerProfile(userId);
            } else if (user.role === 'contractor') {
                roleProfile = await this.getContractorProfile(userId);
            }

            return {
                user,
                contacts,
                profile: roleProfile
            };
        } catch (error) {
            logger.error('Error getting complete user profile:', error);
            throw error;
        }
    }
}