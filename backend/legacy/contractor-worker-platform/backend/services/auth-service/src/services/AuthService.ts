import { Pool } from 'pg';
import { logger } from '../utils/logger';

interface CreateUserData {
    username: string;
    password: string;
    role: 'contractor' | 'worker';
}

interface UpdateUserData {
    name?: string;
    phone?: string;
    location?: string;
}

export class AuthService {
    // Find user by username
    async findUserByUsername(username: string): Promise<any> {
        try {
            const result = await this.pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );
            return result.rows[0];
        } catch (error) {
            logger.error('Error finding user by username:', error);
            throw error;
        }
    }

    // Find user by ID
    async findUserById(id: string): Promise<any> {
        try {
            const result = await this.pool.query(
                'SELECT * FROM users WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            logger.error('Error finding user by ID:', error);
            throw error;
        }
    }
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
    // Create new user
    async createUser(userData: CreateUserData): Promise<any> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const userResult = await client.query(
                `INSERT INTO users (username, email, password_hash, role, created_at, updated_at) 
                 VALUES ($1, $2, $3, $4, NOW(), NOW()) 
                 RETURNING *`,
                [
                    userData.username,
                    userData.username, // set email to username
                    userData.password,
                    userData.role
                ]
            );
            await client.query('COMMIT');
            return userResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            logger.error('Error creating user:', error);
            throw error;
        } finally {
            client.release();
        }
    }
    async updatePassword(id: string, hashedPassword: string): Promise<void> {
        try {
            await this.pool.query(
                'UPDATE users SET password_hash = $2, updated_at = NOW() WHERE id = $1',
                [id, hashedPassword]
            );
        } catch (error) {
            logger.error('Error updating password:', error);
            throw error;
        }
    }

    // Get all users (for admin purposes)
    async getAllUsers(): Promise<any[]> {
        try {
            const result = await this.pool.query(
                'SELECT id, name, email, role, location, created_at FROM users ORDER BY created_at DESC'
            );
            return result.rows;
        } catch (error) {
            logger.error('Error getting all users:', error);
            throw error;
        }
    }

    // Close database connection
    async close(): Promise<void> {
        await this.pool.end();
    }
}