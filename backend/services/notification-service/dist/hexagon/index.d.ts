import { GetHealthUseCase } from './application/use-cases/GetHealthUseCase';
import { SendNotificationUseCase } from './application/use-cases/SendNotificationUseCase';
export interface NotificationModule {
    useCases: {
        getHealth: GetHealthUseCase;
        sendNotification: SendNotificationUseCase;
    };
}
export declare function buildNotificationModule(version?: string): NotificationModule;
