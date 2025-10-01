import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort, ListMessagesCriteria } from '../ports/outbound/MessageRepositoryPort';

export class ListMessagesUseCase {
    constructor(private readonly repo: MessageRepositoryPort) { }
    async execute(criteria: ListMessagesCriteria): Promise<Message[]> {
        return this.repo.list(criteria);
    }
}
