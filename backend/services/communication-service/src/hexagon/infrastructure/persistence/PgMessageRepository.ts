import { Pool } from 'pg';
import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort, ListMessagesCriteria } from '../../application/ports/outbound/MessageRepositoryPort';

export class PgMessageRepository implements MessageRepositoryPort {
    constructor(private pool: Pool) { }

    async save(message: Message): Promise<void> {
        await this.pool.query(
            `INSERT INTO messages (id, from_user_id, to_user_id, body, created_at, read_at)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [message.id, message.fromUserId, message.toUserId, message.body, message.createdAt, message.readAt]
        );
    }

    async list(criteria: ListMessagesCriteria): Promise<Message[]> {
        const { userId, peerId, limit = 50 } = criteria;

        let query: string;
        let params: any[];

        if (peerId) {
            // Conversation between two users
            query = `
                SELECT id, from_user_id as "fromUserId", to_user_id as "toUserId", 
                       body, created_at as "createdAt", read_at as "readAt"
                FROM messages
                WHERE (from_user_id = $1 AND to_user_id = $2)
                   OR (from_user_id = $2 AND to_user_id = $1)
                ORDER BY created_at DESC
                LIMIT $3
            `;
            params = [userId, peerId, limit];
        } else {
            // All messages involving the user
            query = `
                SELECT id, from_user_id as "fromUserId", to_user_id as "toUserId", 
                       body, created_at as "createdAt", read_at as "readAt"
                FROM messages
                WHERE from_user_id = $1 OR to_user_id = $1
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
             SET read_at = $1 
             WHERE id = $2 
             AND to_user_id = $3
             AND read_at IS NULL`,
            [at, messageId, readerId]
        );

        return result.rowCount ? result.rowCount > 0 : false;
    }
}
