import { Message } from '../../../domain/entities/Message';

export interface ListMessagesCriteria {
    userId: string; // messages where user is sender or recipient
    peerId?: string; // optional filter to a conversation partner
    limit?: number;
    beforeId?: string; // for keyset pagination (not implemented in memory yet)
}

export interface MessageRepositoryPort {
    save(message: Message): Promise<void>;
    list(criteria: ListMessagesCriteria): Promise<Message[]>;
    markRead(messageId: string, readerId: string, at: Date): Promise<boolean>;
}
