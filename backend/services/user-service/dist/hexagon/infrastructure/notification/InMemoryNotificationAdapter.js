"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryNotificationAdapter = void 0;
const logger_1 = require("../../../utils/logger");
class InMemoryNotificationAdapter {
    constructor() {
        this.sent = [];
    }
    async sendPasswordResetEmail(params) {
        this.sent.push(params);
        logger_1.logger.info(`(MockEmail) Sent password reset email to ${params.to} with token ${params.token} expiring ${params.expiresAt.toISOString()}`);
    }
}
exports.InMemoryNotificationAdapter = InMemoryNotificationAdapter;
//# sourceMappingURL=InMemoryNotificationAdapter.js.map