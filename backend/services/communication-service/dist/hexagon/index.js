"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCommunicationModule = buildCommunicationModule;
const GetHealthUseCase_1 = require("./application/use-cases/GetHealthUseCase");
const SendMessageUseCase_1 = require("./application/use-cases/SendMessageUseCase");
const ListMessagesUseCase_1 = require("./application/use-cases/ListMessagesUseCase");
const MarkMessageReadUseCase_1 = require("./application/use-cases/MarkMessageReadUseCase");
const InMemoryMessageRepository_1 = require("./infrastructure/persistence/InMemoryMessageRepository");
function buildCommunicationModule(version = '1.0.0') {
    const messageRepo = new InMemoryMessageRepository_1.InMemoryMessageRepository();
    return {
        useCases: {
            getHealth: new GetHealthUseCase_1.GetHealthUseCase(version),
            sendMessage: new SendMessageUseCase_1.SendMessageUseCase(messageRepo),
            listMessages: new ListMessagesUseCase_1.ListMessagesUseCase(messageRepo),
            markMessageRead: new MarkMessageReadUseCase_1.MarkMessageReadUseCase(messageRepo)
        }
    };
}
//# sourceMappingURL=index.js.map