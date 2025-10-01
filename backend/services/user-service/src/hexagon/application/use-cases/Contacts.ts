import { ContactRepositoryPort, CreateContactDTO, UpdateContactDTO } from '../ports/ContactRepository';

export class ListContactsUseCase {
    constructor(private contacts: ContactRepositoryPort) { }
    execute(userId: string) { return this.contacts.findByOwner(userId); }
}

export class CreateContactUseCase {
    constructor(private contacts: ContactRepositoryPort) { }
    async execute(userId: string, dto: CreateContactDTO) {
        if (!dto.type || !dto.value) throw new Error('Type and value are required');
        return this.contacts.create(userId, dto);
    }
}

export class UpdateContactUseCase {
    constructor(private contacts: ContactRepositoryPort) { }
    async execute(contactId: string, userId: string, dto: UpdateContactDTO) {
        if (!Object.keys(dto).length) throw new Error('No valid update fields provided');
        return this.contacts.update(contactId, userId, dto);
    }
}

export class DeleteContactUseCase {
    constructor(private contacts: ContactRepositoryPort) { }
    async execute(contactId: string, userId: string) {
        return this.contacts.delete(contactId, userId);
    }
}
