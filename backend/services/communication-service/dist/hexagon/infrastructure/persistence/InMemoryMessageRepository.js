"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryMessageRepository = void 0;
class InMemoryMessageRepository {
    constructor() {
        this.messages = [];
    }
    async save(message) {
        this.messages.push(message);
    }
    async list(criteria) {
        const { userId, peerId, limit = 50 } = criteria;
        let filtered = this.messages.filter(m => m.fromUserId === userId || m.toUserId === userId);
        if (peerId) {
            filtered = filtered.filter(m => (m.fromUserId === userId && m.toUserId === peerId) || (m.fromUserId === peerId && m.toUserId === userId));
        }
        // Sort newest first
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return filtered.slice(0, limit);
    }
    async markRead(messageId, readerId, at) {
        const msg = this.messages.find(m => m.id === messageId && (m.toUserId === readerId || m.fromUserId === readerId));
        if (!msg)
            return false;
        msg.readAt = at;
        return true;
    }
}
exports.InMemoryMessageRepository = InMemoryMessageRepository;
//# sourceMappingURL=InMemoryMessageRepository.js.map