"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCredentialRepository = void 0;
class InMemoryCredentialRepository {
    constructor() {
        this.items = new Map();
    }
    async findByEmail(email) {
        email = email.toLowerCase();
        for (const item of Array.from(this.items.values())) {
            if (item.email === email)
                return item;
        }
        return null;
    }
    async findById(id) { return this.items.get(id) || null; }
    async create(cred) {
        const record = { ...cred, createdAt: new Date() };
        this.items.set(record.id, record);
        return record;
    }
}
exports.InMemoryCredentialRepository = InMemoryCredentialRepository;
//# sourceMappingURL=InMemoryCredentialRepository.js.map