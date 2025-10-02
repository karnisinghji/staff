import { Pool } from 'pg';
import crypto from 'crypto';

export interface Invitation {
    id: string;
    inviterId: string;
    invitationCode: string;
    invitationType: 'general' | 'worker' | 'contractor';
    recipientName?: string;
    recipientEmail?: string;
    recipientPhone?: string;
    status: 'sent' | 'clicked' | 'registered' | 'expired';
    clicksCount: number;
    registeredUserId?: string;
    registeredAt?: Date;
    expiresAt: Date;
    createdAt: Date;
    customMessage?: string;
}

export interface CreateInvitationRequest {
    invitationType?: 'general' | 'worker' | 'contractor';
    recipientName?: string;
    recipientEmail?: string;
    recipientPhone?: string;
    customMessage?: string;
    expiresInDays?: number; // Default 30 days
}

export interface InvitationStats {
    totalSent: number;
    totalClicked: number;
    totalRegistered: number;
    clickRate: number;
    conversionRate: number;
}

export class InvitationService {
    constructor(private pool: Pool) { }

    // Generate unique invitation code
    private generateInvitationCode(): string {
        return crypto.randomBytes(16).toString('hex');
    }

    // Create new invitation
    async createInvitation(
        inviterId: string,
        request: CreateInvitationRequest
    ): Promise<Invitation> {
        const code = this.generateInvitationCode();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + (request.expiresInDays || 30));

        const query = `
      INSERT INTO invitations (
        inviter_id, invitation_code, invitation_type,
        recipient_name, recipient_email, recipient_phone,
        custom_message, expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

        const values = [
            inviterId,
            code,
            request.invitationType || 'general',
            request.recipientName,
            request.recipientEmail,
            request.recipientPhone,
            request.customMessage,
            expiresAt
        ];

        const result = await this.pool.query(query, values);
        return this.mapRowToInvitation(result.rows[0]);
    }

    // Get invitation by code
    async getInvitationByCode(code: string): Promise<Invitation | null> {
        const query = `
      SELECT * FROM invitations 
      WHERE invitation_code = $1 AND expires_at > NOW()
    `;

        const result = await this.pool.query(query, [code]);
        return result.rows[0] ? this.mapRowToInvitation(result.rows[0]) : null;
    }

    // Track invitation click
    async trackInvitationClick(
        code: string,
        ipAddress?: string,
        userAgent?: string,
        referrer?: string
    ): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            // Update invitation clicks count
            await client.query(`
        UPDATE invitations 
        SET clicks_count = clicks_count + 1, 
            last_clicked_at = NOW(),
            status = CASE WHEN status = 'sent' THEN 'clicked' ELSE status END
        WHERE invitation_code = $1
      `, [code]);

            // Insert detailed click tracking
            await client.query(`
        INSERT INTO invitation_clicks (invitation_id, ip_address, user_agent, referrer)
        SELECT id, $2, $3, $4 FROM invitations WHERE invitation_code = $1
      `, [code, ipAddress, userAgent, referrer]);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // Mark invitation as registered
    async markAsRegistered(code: string, userId: string): Promise<void> {
        const query = `
      UPDATE invitations 
      SET status = 'registered', 
          registered_user_id = $1, 
          registered_at = NOW()
      WHERE invitation_code = $2
    `;

        await this.pool.query(query, [userId, code]);
    }

    // Get user's invitations
    async getUserInvitations(
        userId: string,
        limit: number = 20,
        offset: number = 0
    ): Promise<Invitation[]> {
        const query = `
      SELECT * FROM invitations 
      WHERE inviter_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;

        const result = await this.pool.query(query, [userId, limit, offset]);
        return result.rows.map(row => this.mapRowToInvitation(row));
    }

    // Get invitation statistics for user
    async getUserInvitationStats(userId: string): Promise<InvitationStats> {
        const query = `
      SELECT 
        COUNT(*) as total_sent,
        COUNT(CASE WHEN status IN ('clicked', 'registered') THEN 1 END) as total_clicked,
        COUNT(CASE WHEN status = 'registered' THEN 1 END) as total_registered
      FROM invitations 
      WHERE inviter_id = $1
    `;

        const result = await this.pool.query(query, [userId]);
        const row = result.rows[0];

        const totalSent = parseInt(row.total_sent);
        const totalClicked = parseInt(row.total_clicked);
        const totalRegistered = parseInt(row.total_registered);

        return {
            totalSent,
            totalClicked,
            totalRegistered,
            clickRate: totalSent > 0 ? (totalClicked / totalSent) * 100 : 0,
            conversionRate: totalClicked > 0 ? (totalRegistered / totalClicked) * 100 : 0
        };
    }

    // Generate invitation link
    generateInvitationLink(code: string, baseUrl: string = 'https://yourapp.com'): string {
        return `${baseUrl}/register?invite=${code}`;
    }

    // Helper method to map database row to Invitation object
    private mapRowToInvitation(row: any): Invitation {
        return {
            id: row.id,
            inviterId: row.inviter_id,
            invitationCode: row.invitation_code,
            invitationType: row.invitation_type,
            recipientName: row.recipient_name,
            recipientEmail: row.recipient_email,
            recipientPhone: row.recipient_phone,
            status: row.status,
            clicksCount: row.clicks_count,
            registeredUserId: row.registered_user_id,
            registeredAt: row.registered_at,
            expiresAt: row.expires_at,
            createdAt: row.created_at,
            customMessage: row.custom_message
        };
    }
}