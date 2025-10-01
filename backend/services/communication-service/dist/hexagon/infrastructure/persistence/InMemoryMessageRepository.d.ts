import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort, ListMessagesCriteria } from '../../application/ports/outbound/MessageRepositoryPort';
export declare class InMemoryMessageRepository implements MessageRepositoryPort {
    private messages;
    save(message: Message): Promise<void>;
    list(criteria: ListMessagesCriteria): Promise<Message[]>;
    markRead(messageId: string, readerId: string, at: Date): Promise<boolean>;
}
