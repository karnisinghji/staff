"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContactUseCase = exports.UpdateContactUseCase = exports.CreateContactUseCase = exports.ListContactsUseCase = void 0;
class ListContactsUseCase {
    constructor(contacts) {
        this.contacts = contacts;
    }
    execute(userId) { return this.contacts.findByOwner(userId); }
}
exports.ListContactsUseCase = ListContactsUseCase;
class CreateContactUseCase {
    constructor(contacts) {
        this.contacts = contacts;
    }
    async execute(userId, dto) {
        if (!dto.type || !dto.value)
            throw new Error('Type and value are required');
        return this.contacts.create(userId, dto);
    }
}
exports.CreateContactUseCase = CreateContactUseCase;
class UpdateContactUseCase {
    constructor(contacts) {
        this.contacts = contacts;
    }
    async execute(contactId, userId, dto) {
        if (!Object.keys(dto).length)
            throw new Error('No valid update fields provided');
        return this.contacts.update(contactId, userId, dto);
    }
}
exports.UpdateContactUseCase = UpdateContactUseCase;
class DeleteContactUseCase {
    constructor(contacts) {
        this.contacts = contacts;
    }
    async execute(contactId, userId) {
        return this.contacts.delete(contactId, userId);
    }
}
exports.DeleteContactUseCase = DeleteContactUseCase;
//# sourceMappingURL=Contacts.js.map