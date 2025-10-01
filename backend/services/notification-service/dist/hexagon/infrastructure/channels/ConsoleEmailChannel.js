"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleEmailChannel = void 0;
class ConsoleEmailChannel {
    supports(channel) { return channel === 'email'; }
    async send(notification) {
        // Simulate sending
        // eslint-disable-next-line no-console
        console.log(`[EMAIL] to user=${notification.userId} template=${notification.template} data=${JSON.stringify(notification.data)}`);
    }
}
exports.ConsoleEmailChannel = ConsoleEmailChannel;
//# sourceMappingURL=ConsoleEmailChannel.js.map