import { UserEntity } from '../../../domain/entities/User';
import { UserRepositoryPort, UpdateUserFields } from '../../ports/UserRepository';
import { ContactRepositoryPort, ContactRecord, CreateContactDTO, UpdateContactDTO } from '../../ports/ContactRepository';
import { ProfileRepositoryPort, WorkerProfileRecord, ContractorProfileRecord } from '../../ports/ProfileRepository';

export class FakeUserRepo implements UserRepositoryPort {
    store = new Map<string, UserEntity>();
    constructor(seed?: UserEntity[]) { seed?.forEach(u => this.store.set(u.id, u)); }
    findById(id: string) { return Promise.resolve(this.store.get(id) || null); }
    updateUser(id: string, fields: UpdateUserFields) {
        const existing = this.store.get(id);
        if (!existing) throw new Error('User not found');
        const updated = new UserEntity({
            ...existing.toPrimitives(),
            ...fields
        });
        this.store.set(id, updated);
        return Promise.resolve(updated);
    }
}

let contactIdCounter = 0;
export class FakeContactRepo implements ContactRepositoryPort {
    contacts: ContactRecord[] = [];
    constructor(seed?: ContactRecord[]) { if (seed) this.contacts = [...seed]; }
    findByOwner(userId: string) { return Promise.resolve(this.contacts.filter(c => c.owner_id === userId)); }
    create(ownerId: string, dto: CreateContactDTO) {
        if (dto.isPrimary) {
            this.contacts = this.contacts.map(c => c.owner_id === ownerId && c.type === dto.type ? { ...c, is_primary: false } : c);
        }
        const rec: ContactRecord = {
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
    update(contactId: string, ownerId: string, dto: UpdateContactDTO) {
        const idx = this.contacts.findIndex(c => c.id === contactId && c.owner_id === ownerId);
        if (idx === -1) throw new Error('Contact not found');
        if (dto.isPrimary) {
            const type = this.contacts[idx].type;
            this.contacts = this.contacts.map(c => c.owner_id === ownerId && c.type === type ? { ...c, is_primary: false } : c);
        }
        const updated = { ...this.contacts[idx], ...('type' in dto ? { type: dto.type } : {}), ...('value' in dto ? { value: dto.value } : {}), ...('isPrimary' in dto ? { is_primary: dto.isPrimary } : {}) };
        this.contacts[idx] = updated;
        return Promise.resolve(updated);
    }
    delete(contactId: string, ownerId: string) {
        const before = this.contacts.length;
        this.contacts = this.contacts.filter(c => !(c.id === contactId && c.owner_id === ownerId));
        if (this.contacts.length === before) throw new Error('Contact not found');
        return Promise.resolve();
    }
}

export class FakeProfileRepo implements ProfileRepositoryPort {
    worker = new Map<string, WorkerProfileRecord>();
    contractor = new Map<string, ContractorProfileRecord>();
    getWorkerProfile(userId: string) { return Promise.resolve(this.worker.get(userId) || null); }
    getContractorProfile(userId: string) { return Promise.resolve(this.contractor.get(userId) || null); }
    updateWorkerProfile(userId: string, fields: any) {
        if (!this.worker.get(userId)) throw new Error('Worker profile not found');
        const existing = this.worker.get(userId)!;
        const mapped: any = { ...existing };
        if ('skillType' in fields) mapped.skill_type = fields.skillType;
        if ('experienceYears' in fields) mapped.experience_years = fields.experienceYears;
        if ('hourlyRate' in fields) mapped.hourly_rate = fields.hourlyRate;
        if ('availability' in fields) mapped.availability = fields.availability;
        if ('description' in fields) mapped.description = fields.description;
        if ('isAvailable' in fields) mapped.is_available = fields.isAvailable;
        const updated = mapped;
        this.worker.set(userId, updated);
        return Promise.resolve(updated);
    }
    updateContractorProfile(userId: string, fields: any) {
        if (!this.contractor.get(userId)) throw new Error('Contractor profile not found');
        const existing = this.contractor.get(userId)!;
        const mapped: any = { ...existing };
        if ('companyName' in fields) mapped.company_name = fields.companyName;
        if ('companyDescription' in fields) mapped.company_description = fields.companyDescription;
        const updated = mapped;
        this.contractor.set(userId, updated);
        return Promise.resolve(updated);
    }
}

export function makeUser(id: string, role: 'worker' | 'contractor', partial: Partial<Omit<ConstructorParameters<typeof UserEntity>[0], 'id' | 'role' | 'createdAt' | 'username'>> = {}) {
    return new UserEntity({
        id,
        username: `user_${id}`,
        role,
        name: partial.name ?? null,
        location: partial.location ?? null,
        phone: partial.phone ?? null,
        createdAt: new Date()
    });
}
