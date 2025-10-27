import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort, ListMessagesCriteria } from '../../application/ports/outbound/MessageRepositoryPort';

export class InMemoryMessageRepository implements MessageRepositoryPort {
    private messages: Message[] = [];

    async save(message: Message): Promise<void> {
        this.messages.push(message);
    }

    async list(criteria: ListMessagesCriteria): Promise<Message[]> {
        const { userId, peerId, limit = 50 } = criteria;
        let filtered = this.messages.filter(m => m.fromUserId === userId || m.toUserId === userId);
        if (peerId) {
            filtered = filtered.filter(m => (m.fromUserId === userId && m.toUserId === peerId) || (m.fromUserId === peerId && m.toUserId === userId));
        }
        // Sort newest first
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return filtered.slice(0, limit);
    }

    async markRead(messageId: string, readerId: string, at: Date): Promise<boolean> {
        const msg = this.messages.find(m => m.id === messageId && (m.toUserId === readerId || m.fromUserId === readerId));
        if (!msg) return false;
        msg.readAt = at;
        return true;
    }

    async softDelete(messageId: string): Promise<boolean> {
        const index = this.messages.findIndex(m => m.id === messageId);
        if (index === -1) return false;
        // In memory, we just remove it (or could add a deletedAt field)
        this.messages.splice(index, 1);
        return true;
    }
}
