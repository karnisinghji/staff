import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort } from '../ports/outbound/MessageRepositoryPort';
export interface SendMessageCommand {
    fromUserId: string;
    toUserId: string;
    body: string;
}
export declare class SendMessageUseCase {
    private readonly repo;
    constructor(repo: MessageRepositoryPort);
    execute(cmd: SendMessageCommand): Promise<Message>;
}
