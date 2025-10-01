import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort, ListMessagesCriteria } from '../ports/outbound/MessageRepositoryPort';
export declare class ListMessagesUseCase {
    private readonly repo;
    constructor(repo: MessageRepositoryPort);
    execute(criteria: ListMessagesCriteria): Promise<Message[]>;
}
