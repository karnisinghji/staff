"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNotificationModule = buildNotificationModule;
const GetHealthUseCase_1 = require("./application/use-cases/GetHealthUseCase");
const SendNotificationUseCase_1 = require("./application/use-cases/SendNotificationUseCase");
const ConsoleEmailChannel_1 = require("./infrastructure/channels/ConsoleEmailChannel");
function buildNotificationModule(version = '1.0.0') {
    const channels = [new ConsoleEmailChannel_1.ConsoleEmailChannel()];
    return {
        useCases: {
            getHealth: new GetHealthUseCase_1.GetHealthUseCase(version),
            sendNotification: new SendNotificationUseCase_1.SendNotificationUseCase(channels)
        }
    };
}
//# sourceMappingURL=index.js.map