import { GetHealthUseCase } from './application/use-cases/GetHealthUseCase';
import { SendNotificationUseCase } from './application/use-cases/SendNotificationUseCase';
import { ConsoleEmailChannel } from './infrastructure/channels/ConsoleEmailChannel';
import { NotificationChannelPort } from './application/ports/outbound/NotificationChannelPort';

export interface NotificationModule {
    useCases: {
        getHealth: GetHealthUseCase;
        sendNotification: SendNotificationUseCase;
    }
}

export function buildNotificationModule(version = '1.0.0'): NotificationModule {
    const channels: NotificationChannelPort[] = [new ConsoleEmailChannel()];
    return {
        useCases: {
            getHealth: new GetHealthUseCase(version),
            sendNotification: new SendNotificationUseCase(channels)
        }
    };
}
