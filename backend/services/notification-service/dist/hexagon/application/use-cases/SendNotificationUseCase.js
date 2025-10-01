"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationUseCase = void 0;
const uuid_1 = require("uuid");
class SendNotificationUseCase {
    constructor(channels) {
        this.channels = channels;
    }
    async execute(cmd) {
        const notification = {
            id: (0, uuid_1.v4)(),
            userId: cmd.userId,
            channel: cmd.channel,
            template: cmd.template,
            data: cmd.data || {},
            createdAt: new Date(),
            sentAt: null,
            status: 'pending'
        };
        const channel = this.channels.find(c => c.supports(cmd.channel));
        if (!channel) {
            notification.status = 'failed';
            notification.error = 'Unsupported channel';
            return notification;
        }
        try {
            await channel.send(notification);
            notification.status = 'sent';
            notification.sentAt = new Date();
        }
        catch (e) {
            notification.status = 'failed';
            notification.error = e.message || 'Unknown error';
        }
        return notification;
    }
}
exports.SendNotificationUseCase = SendNotificationUseCase;
//# sourceMappingURL=SendNotificationUseCase.js.map