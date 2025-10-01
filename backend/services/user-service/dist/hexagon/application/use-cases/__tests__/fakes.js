"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeProfileRepo = exports.FakeContactRepo = exports.FakeUserRepo = void 0;
exports.makeUser = makeUser;
const User_1 = require("../../../domain/entities/User");
class FakeUserRepo {
    constructor(seed) {
        this.store = new Map();
        seed?.forEach(u => this.store.set(u.id, u));
    }
    findById(id) { return Promise.resolve(this.store.get(id) || null); }
    updateUser(id, fields) {
        const existing = this.store.get(id);
        if (!existing)
            throw new Error('User not found');
        const updated = new User_1.UserEntity({
            ...existing.toPrimitives(),
            ...fields
        });
        this.store.set(id, updated);
        return Promise.resolve(updated);
    }
}
exports.FakeUserRepo = FakeUserRepo;
let contactIdCounter = 0;
class FakeContactRepo {
    constructor(seed) {
        this.contacts = [];
        if (seed)
            this.contacts = [...seed];
    }
    findByOwner(userId) { return Promise.resolve(this.contacts.filter(c => c.owner_id === userId)); }
    create(ownerId, dto) {
        if (dto.isPrimary) {
            this.contacts = this.contacts.map(c => c.owner_id === ownerId && c.type === dto.type ? { ...c, is_primary: false } : c);
        }
        const rec = {
            id: (++contactIdCounter).toString(),
            owner_id: ownerId,
            type: dto.type,
            value: dto.value,
            is_primary: !!dto.isPrimary,
            is_verified: false,
            created_at: new Date().toISOString()
        };
        this.contacts.push(rec);
        return Promise.resolve(rec);
    }
    update(contactId, ownerId, dto) {
        const idx = this.contacts.findIndex(c => c.id === contactId && c.owner_id === ownerId);
        if (idx === -1)
            throw new Error('Contact not found');
        if (dto.isPrimary) {
            const type = this.contacts[idx].type;
            this.contacts = this.contacts.map(c => c.owner_id === ownerId && c.type === type ? { ...c, is_primary: false } : c);
        }
        const updated = { ...this.contacts[idx], ...('type' in dto ? { type: dto.type } : {}), ...('value' in dto ? { value: dto.value } : {}), ...('isPrimary' in dto ? { is_primary: dto.isPrimary } : {}) };
        this.contacts[idx] = updated;
        return Promise.resolve(updated);
    }
    delete(contactId, ownerId) {
        const before = this.contacts.length;
        this.contacts = this.contacts.filter(c => !(c.id === contactId && c.owner_id === ownerId));
        if (this.contacts.length === before)
            throw new Error('Contact not found');
        return Promise.resolve();
    }
}
exports.FakeContactRepo = FakeContactRepo;
class FakeProfileRepo {
    constructor() {
        this.worker = new Map();
        this.contractor = new Map();
    }
    getWorkerProfile(userId) { return Promise.resolve(this.worker.get(userId) || null); }
    getContractorProfile(userId) { return Promise.resolve(this.contractor.get(userId) || null); }
    updateWorkerProfile(userId, fields) {
        if (!this.worker.get(userId))
            throw new Error('Worker profile not found');
        const existing = this.worker.get(userId);
        const mapped = { ...existing };
        if ('skillType' in fields)
            mapped.skill_type = fields.skillType;
        if ('experienceYears' in fields)
            mapped.experience_years = fields.experienceYears;
        if ('hourlyRate' in fields)
            mapped.hourly_rate = fields.hourlyRate;
        if ('availability' in fields)
            mapped.availability = fields.availability;
        if ('description' in fields)
            mapped.description = fields.description;
        if ('isAvailable' in fields)
            mapped.is_available = fields.isAvailable;
        const updated = mapped;
        this.worker.set(userId, updated);
        return Promise.resolve(updated);
    }
    updateContractorProfile(userId, fields) {
        if (!this.contractor.get(userId))
            throw new Error('Contractor profile not found');
        const existing = this.contractor.get(userId);
        const mapped = { ...existing };
        if ('companyName' in fields)
            mapped.company_name = fields.companyName;
        if ('companyDescription' in fields)
            mapped.company_description = fields.companyDescription;
        const updated = mapped;
        this.contractor.set(userId, updated);
        return Promise.resolve(updated);
    }
}
exports.FakeProfileRepo = FakeProfileRepo;
function makeUser(id, role, partial = {}) {
    return new User_1.UserEntity({
        id,
        username: `user_${id}`,
        role,
        name: partial.name ?? null,
        location: partial.location ?? null,
        phone: partial.phone ?? null,
        createdAt: new Date()
    });
}
//# sourceMappingURL=fakes.js.map