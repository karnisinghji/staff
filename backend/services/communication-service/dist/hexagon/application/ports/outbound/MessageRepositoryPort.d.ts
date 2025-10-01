import { Message } from '../../../domain/entities/Message';
export interface ListMessagesCriteria {
    userId: string;
    peerId?: string;
    limit?: number;
    beforeId?: string;
}
export interface MessageRepositoryPort {
    save(message: Message): Promise<void>;
    list(criteria: ListMessagesCriteria): Promise<Message[]>;
    markRead(messageId: string, readerId: string, at: Date): Promise<boolean>;
}
