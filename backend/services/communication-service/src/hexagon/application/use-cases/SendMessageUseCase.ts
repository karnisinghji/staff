import { v4 as uuid } from 'uuid';
import { Message } from '../../domain/entities/Message';
import { MessageRepositoryPort } from '../ports/outbound/MessageRepositoryPort';

export interface SendMessageCommand {
    fromUserId: string;
    toUserId: string;
    body: string;
}

export class SendMessageUseCase {
    constructor(private readonly repo: MessageRepositoryPort) { }
    async execute(cmd: SendMessageCommand): Promise<Message> {
        const message: Message = {
            id: uuid(),
            fromUserId: cmd.fromUserId,
            toUserId: cmd.toUserId,
            body: cmd.body,
            createdAt: new Date(),
            readAt: null
        };
        await this.repo.save(message);
        return message;
    }
}
