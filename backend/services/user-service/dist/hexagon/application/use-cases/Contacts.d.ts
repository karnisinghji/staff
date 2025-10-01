import { ContactRepositoryPort, CreateContactDTO, UpdateContactDTO } from '../ports/ContactRepository';
export declare class ListContactsUseCase {
    private contacts;
    constructor(contacts: ContactRepositoryPort);
    execute(userId: string): Promise<import("../ports/ContactRepository").ContactRecord[]>;
}
export declare class CreateContactUseCase {
    private contacts;
    constructor(contacts: ContactRepositoryPort);
    execute(userId: string, dto: CreateContactDTO): Promise<import("../ports/ContactRepository").ContactRecord>;
}
export declare class UpdateContactUseCase {
    private contacts;
    constructor(contacts: ContactRepositoryPort);
    execute(contactId: string, userId: string, dto: UpdateContactDTO): Promise<import("../ports/ContactRepository").ContactRecord>;
}
export declare class DeleteContactUseCase {
    private contacts;
    constructor(contacts: ContactRepositoryPort);
    execute(contactId: string, userId: string): Promise<void>;
}
