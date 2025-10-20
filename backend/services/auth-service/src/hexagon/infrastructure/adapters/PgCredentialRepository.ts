import { Pool } from 'pg';
import { CredentialRepositoryPort } from '../../application/ports/CredentialRepositoryPort';
import { UserCredentials } from '../../domain/entities/UserCredentials';

export class PgCredentialRepository implements CredentialRepositoryPort {
    constructor(private pool: Pool) { }

    async findByEmail(email: string): Promise<UserCredentials | null> {
        // Search by email or username (which can be email or phone)
        const query = `
            SELECT id, email, username, name, password_hash, role::text as roles, created_at, oauth_provider, oauth_id
            FROM users 
            WHERE (LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1)) AND is_active = true
            LIMIT 1
        `;

        const result = await this.pool.query(query, [email]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return {
            id: row.id,
            email: row.email || row.username,
            passwordHash: row.password_hash,
            roles: [row.roles], // Convert single role to array format
            createdAt: row.created_at,
            oauthProvider: row.oauth_provider || undefined,
            oauthId: row.oauth_id || undefined
        };
    }

    async findById(id: string): Promise<UserCredentials | null> {
        const query = `
            SELECT id, email, password_hash, role::text as roles, created_at 
            FROM users 
            WHERE id = $1 AND is_active = true
        `;

        const result = await this.pool.query(query, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return {
            id: row.id,
            email: row.email.toLowerCase(),
            passwordHash: row.password_hash,
            roles: [row.roles], // Convert single role to array format
            createdAt: row.created_at
        };
    }

    async create(cred: Omit<UserCredentials, 'createdAt'>): Promise<UserCredentials> {
        const query = `
            INSERT INTO users (id, username, email, password_hash, role, name, phone, location, is_active)
            VALUES ($1, $2, $3, $4, $5::user_role, $6, $7, $8, true)
            RETURNING id, username, email, name, password_hash, role::text as roles, created_at
        `;

        // Extract primary role for the enum field
        const primaryRole = cred.roles && cred.roles.length > 0 ? cred.roles[0] : 'worker';

        // Set default values for required fields that aren't in UserCredentials
        const name = 'User'; // Default name, could be enhanced later

        // Determine if the email is a phone number or email
        const isPhone = /^[\+]?[0-9]{7,15}$/.test(cred.email);

        // Properly separate email and phone columns
        const emailValue = isPhone ? null : cred.email;  // NULL if phone registration, email if email registration
        const phoneValue = isPhone ? cred.email : null;  // phone number if phone registration, NULL if email registration
        const username = cred.email; // Use email/phone as username
        const location = 'Not specified'; // Default location, could be enhanced later

        try {
            const result = await this.pool.query(query, [
                cred.id,
                username,          // username: email or phone (required field)
                emailValue || cred.email,  // email: actual email 
                cred.passwordHash,
                primaryRole,
                name,
                phoneValue,        // phone: actual phone or NULL
                location
            ]);

            if (result.rows.length === 0) {
                throw new Error('Failed to create user credentials');
            }

            const row = result.rows[0];
            return {
                id: row.id,
                email: row.email, // Return email from database
                passwordHash: row.password_hash,
                roles: [row.roles], // Convert single role to array format
                createdAt: row.created_at
            };
        } catch (error: any) {
            // PostgreSQL unique constraint violation error code
            if (error.code === '23505') {
                // Check which constraint was violated
                if (error.constraint === 'users_email_key' || error.constraint === 'users_email_unique' || error.detail?.includes('email')) {
                    throw new Error('EMAIL_TAKEN');
                } else if (error.constraint === 'users_phone_unique' || error.detail?.includes('phone')) {
                    throw new Error('PHONE_TAKEN');
                }
                // Generic duplicate error
                throw new Error('DUPLICATE_USER');
            }
            // Re-throw other errors
            throw error;
        }
    }

    async findByOAuth(provider: string, oauthId: string): Promise<UserCredentials | null> {
        const query = `
            SELECT id, email, username, password_hash, role::text as roles, created_at, oauth_provider, oauth_id
            FROM users 
            WHERE oauth_provider = $1 AND oauth_id = $2 AND is_active = true
        `;

        const result = await this.pool.query(query, [provider, oauthId]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return {
            id: row.id,
            email: row.username || row.email || `${provider}_${oauthId}`,
            passwordHash: row.password_hash || '', // OAuth users may not have password
            roles: [row.roles],
            createdAt: row.created_at
        };
    }

    async createOAuthUser(data: {
        id: string;
        oauthProvider: string;
        oauthId: string;
        email?: string;
        name?: string;
        username?: string;
        role?: string;
        profileData: any;
    }): Promise<UserCredentials> {
        const query = `
            INSERT INTO users (
                id, username, email, password_hash, role, name, phone, location, 
                is_active, oauth_provider, oauth_id, oauth_profile
            )
            VALUES ($1, $2, $3, NULL, $4::user_role, $5, NULL, 'Not specified', true, $6, $7, $8)
            RETURNING id, username, email, role::text as roles, created_at
        `;

        const username = data.username || data.email || `${data.oauthProvider}_${data.oauthId}`;
        const role = data.role || 'worker';
        const name = data.name || 'User';

        try {
            const result = await this.pool.query(query, [
                data.id,
                username,
                data.email || null,
                role,
                name,
                data.oauthProvider,
                data.oauthId,
                JSON.stringify(data.profileData)
            ]);

            if (result.rows.length === 0) {
                throw new Error('Failed to create OAuth user');
            }

            const row = result.rows[0];
            return {
                id: row.id,
                email: row.username,
                passwordHash: '',
                roles: [row.roles],
                createdAt: row.created_at
            };
        } catch (error: any) {
            if (error.code === '23505') {
                if (error.constraint === 'users_oauth_provider_id_unique') {
                    throw new Error('OAUTH_ACCOUNT_EXISTS');
                }
                throw new Error('DUPLICATE_USER');
            }
            throw error;
        }
    }
}