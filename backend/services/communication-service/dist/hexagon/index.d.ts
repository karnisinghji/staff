import { GetHealthUseCase } from './application/use-cases/GetHealthUseCase';
import { SendMessageUseCase } from './application/use-cases/SendMessageUseCase';
import { ListMessagesUseCase } from './application/use-cases/ListMessagesUseCase';
import { MarkMessageReadUseCase } from './application/use-cases/MarkMessageReadUseCase';
export interface CommunicationModule {
    useCases: {
        getHealth: GetHealthUseCase;
        sendMessage: SendMessageUseCase;
        listMessages: ListMessagesUseCase;
        markMessageRead: MarkMessageReadUseCase;
    };
}
export declare function buildCommunicationModule(version?: string): CommunicationModule;
