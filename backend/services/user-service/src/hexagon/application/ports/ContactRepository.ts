export interface ContactRecord {
    id: string;
    owner_id: string;
    type: string;
    value: string;
    is_primary: boolean;
    is_verified: boolean;
    created_at: string;
}
export interface CreateContactDTO { type: string; value: string; isPrimary?: boolean; }
export interface UpdateContactDTO { type?: string; value?: string; isPrimary?: boolean; }

export interface ContactRepositoryPort {
    findByOwner(userId: string): Promise<ContactRecord[]>;
    create(ownerId: string, dto: CreateContactDTO): Promise<ContactRecord>;
    update(contactId: string, ownerId: string, dto: UpdateContactDTO): Promise<ContactRecord>;
    delete(contactId: string, ownerId: string): Promise<void>;
}
