import { GetHealthUseCase } from './application/use-cases/GetHealthUseCase';
import { SendMessageUseCase } from './application/use-cases/SendMessageUseCase';
import { ListMessagesUseCase } from './application/use-cases/ListMessagesUseCase';
import { MarkMessageReadUseCase } from './application/use-cases/MarkMessageReadUseCase';
import { InMemoryMessageRepository } from './infrastructure/persistence/InMemoryMessageRepository';

export interface CommunicationModule {
    useCases: {
        getHealth: GetHealthUseCase;
        sendMessage: SendMessageUseCase;
        listMessages: ListMessagesUseCase;
        markMessageRead: MarkMessageReadUseCase;
    };
}

export function buildCommunicationModule(version = '1.0.0'): CommunicationModule {
    const messageRepo = new InMemoryMessageRepository();
    return {
        useCases: {
            getHealth: new GetHealthUseCase(version),
            sendMessage: new SendMessageUseCase(messageRepo),
            listMessages: new ListMessagesUseCase(messageRepo),
            markMessageRead: new MarkMessageReadUseCase(messageRepo)
        }
    };
}
