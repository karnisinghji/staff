import { CreateContactUseCase, UpdateContactUseCase, DeleteContactUseCase, ListContactsUseCase } from '../Contacts';
import { FakeContactRepo } from './fakes';

describe('Contact use cases', () => {
    it('creates and lists contacts with primary handling', async () => {
        const repo = new FakeContactRepo();
        const create = new CreateContactUseCase(repo);
        const list = new ListContactsUseCase(repo);
        await create.execute('u1', { type: 'email', value: 'a@b.com', isPrimary: true });
        await create.execute('u1', { type: 'email', value: 'c@d.com', isPrimary: true });
        const contacts = await list.execute('u1');
        const primaries = contacts.filter(c => c.is_primary);
        expect(primaries.length).toBe(1);
    });
    it('updates a contact and sets primary', async () => {
        const repo = new FakeContactRepo();
        const create = new CreateContactUseCase(repo);
        const update = new UpdateContactUseCase(repo);
        const c1 = await create.execute('u2', { type: 'phone', value: '111', isPrimary: true });
        const c2 = await create.execute('u2', { type: 'phone', value: '222' });
        await update.execute(c2.id, 'u2', { isPrimary: true });
        const contacts = repo.contacts.filter(c => c.owner_id === 'u2');
        expect(contacts.find(c => c.id === c1.id)!.is_primary).toBe(false);
        expect(contacts.find(c => c.id === c2.id)!.is_primary).toBe(true);
    });
    it('deletes a contact', async () => {
        const repo = new FakeContactRepo();
        const create = new CreateContactUseCase(repo);
        const del = new DeleteContactUseCase(repo);
        const c = await create.execute('u3', { type: 'email', value: 'x@y.com' });
        await del.execute(c.id, 'u3');
        expect(repo.contacts.find(cc => cc.id === c.id)).toBeUndefined();
    });
});
