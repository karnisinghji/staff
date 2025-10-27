import { Pool } from 'pg';
import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort, ListMessagesCriteria } from '../../application/ports/outbound/MessageRepositoryPort';

export class PgMessageRepository implements MessageRepositoryPort {
    constructor(private pool: Pool) { }

    async save(message: Message): Promise<void> {
        await this.pool.query(
            `INSERT INTO messages (id, sender_id, recipient_id, content, created_at, is_read)
             VALUES ($1, $2::uuid, $3::uuid, $4, $5, false)`,
            [message.id, message.fromUserId, message.toUserId, message.body, message.createdAt]
        );
    }

    async list(criteria: ListMessagesCriteria): Promise<Message[]> {
        const { userId, peerId, limit = 50 } = criteria;

        let query: string;
        let params: any[];

        if (peerId) {
            // Conversation between two users (exclude soft-deleted)
            query = `
                SELECT id, sender_id as "fromUserId", recipient_id as "toUserId", 
                       content as body, created_at as "createdAt", 
                       CASE WHEN is_read THEN created_at ELSE NULL END as "readAt"
                FROM messages
                WHERE ((sender_id::text = $1 AND recipient_id::text = $2)
                   OR (sender_id::text = $2 AND recipient_id::text = $1))
                   AND deleted_at IS NULL
                ORDER BY created_at DESC
                LIMIT $3
            `;
            params = [userId, peerId, limit];
        } else {
            // All messages involving the user (exclude soft-deleted)
            query = `
                SELECT id, sender_id as "fromUserId", recipient_id as "toUserId", 
                       content as body, created_at as "createdAt",
                       CASE WHEN is_read THEN created_at ELSE NULL END as "readAt"
                FROM messages
                WHERE (sender_id::text = $1 OR recipient_id::text = $1)
                   AND deleted_at IS NULL
                ORDER BY created_at DESC
                LIMIT $2
            `;
            params = [userId, limit];
        }

        const result = await this.pool.query(query, params);

        return result.rows.map(row => ({
            id: row.id,
            fromUserId: row.fromUserId,
            toUserId: row.toUserId,
            body: row.body,
            createdAt: new Date(row.createdAt),
            readAt: row.readAt ? new Date(row.readAt) : undefined
        }));
    }

    async markRead(messageId: string, readerId: string, at: Date): Promise<boolean> {
        const result = await this.pool.query(
            `UPDATE messages 
             SET is_read = true
             WHERE id = $1 
             AND recipient_id::text = $2
             AND is_read = false`,
            [messageId, readerId]
        );

        return result.rowCount ? result.rowCount > 0 : false;
    }

    async softDelete(messageId: string): Promise<boolean> {
        const result = await this.pool.query(
            `UPDATE messages 
             SET deleted_at = NOW() 
             WHERE id = $1 
             AND deleted_at IS NULL`,
            [messageId]
        );

        return result.rowCount ? result.rowCount > 0 : false;
    }
}
