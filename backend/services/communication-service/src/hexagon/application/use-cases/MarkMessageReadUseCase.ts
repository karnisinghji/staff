import { MessageRepositoryPort } from '../ports/outbound/MessageRepositoryPort';

export class MarkMessageReadUseCase {
    constructor(private readonly repo: MessageRepositoryPort) { }
    async execute(messageId: string, readerId: string): Promise<boolean> {
        return this.repo.markRead(messageId, readerId, new Date());
    }
}
