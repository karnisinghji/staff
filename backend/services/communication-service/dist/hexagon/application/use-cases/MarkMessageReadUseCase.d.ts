import { MessageRepositoryPort } from '../ports/outbound/MessageRepositoryPort';
export declare class MarkMessageReadUseCase {
    private readonly repo;
    constructor(repo: MessageRepositoryPort);
    execute(messageId: string, readerId: string): Promise<boolean>;
}
