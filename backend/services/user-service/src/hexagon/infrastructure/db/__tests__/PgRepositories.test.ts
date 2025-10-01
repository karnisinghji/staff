import { newDb } from 'pg-mem';
import { randomUUID } from 'crypto';
import { PgUserRepository, PgContactRepository, PgProfileRepository } from '../PgRepositories';
import { Pool } from 'pg';

// Force application-side UUID generation in tests to avoid pg-mem edge cases with default uuid
process.env.CONTACT_ID_STRATEGY = 'app';

describe('PgRepositories (pg-mem)', () => {
    let pool: Pool;

    function buildFreshPool() {
        const db = newDb({ autoCreateForeignKeyIndices: true });
        // Register gen_random_uuid before DDL so default works if ever used
        // @ts-ignore
        db.public.registerFunction({ name: 'gen_random_uuid', implementation: () => randomUUID() });
        db.public.none(`
      CREATE TABLE users (
        id text primary key,
        username text,
        email text,
        role text NOT NULL,
        name text,
        location text,
        phone text,
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      );
      CREATE TABLE worker_profiles (
        user_id text primary key references users(id) on delete cascade,
        skill_type text,
        experience_years int,
        hourly_rate int,
        availability text,
        description text,
        is_available boolean default true,
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      );
      CREATE TABLE contractor_profiles (
        owner_id text primary key references users(id) on delete cascade,
        company_name text,
        company_description text,
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      );
      CREATE TABLE contacts (
        id uuid primary key default gen_random_uuid(),
        owner_id text references users(id) on delete cascade,
        type text not null,
        value text not null,
        is_primary boolean default false,
        is_verified boolean default false,
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      );
    `);
        // Re-register function (pg-mem quirk-safe)
        // @ts-ignore
        db.public.registerFunction({ name: 'gen_random_uuid', implementation: () => randomUUID() });
        const adapter = db.adapters.createPg();
        return new adapter.Pool();
    }

    beforeEach(async () => {
        pool = buildFreshPool();
        await pool.query(`INSERT INTO users(id, username, email, role, name, location, phone) VALUES ('u1','user_u1','u1@example.com','worker','Worker One','NY','123')`);
        await pool.query(`INSERT INTO worker_profiles(user_id, skill_type, experience_years, hourly_rate, availability, description) VALUES ('u1','plumbing',5,40,'weekdays','Experienced plumber')`);
    });

    afterEach(async () => {
        if (pool) await (pool as any).end();
    });

    it('updates user fields', async () => {
        const repo = new PgUserRepository(pool);
        const updated = await repo.updateUser('u1', { name: 'Worker Uno', location: 'LA' });
        expect(updated.toPrimitives().name).toBe('Worker Uno');
        const check = await repo.findById('u1');
        expect(check?.toPrimitives().location).toBe('LA');
    });

    it('manages contacts with primary logic', async () => {
        const repo = new PgContactRepository(pool);
        const c1 = await repo.create('u1', { type: 'email', value: 'a@a.com', isPrimary: true });
        expect(c1.is_primary).toBe(true);
        const c2 = await repo.create('u1', { type: 'email', value: 'b@b.com', isPrimary: true });
        const all = await repo.findByOwner('u1');
        const primaries = all.filter(c => c.is_primary);
        expect(primaries).toHaveLength(1);
        expect(primaries[0].id).toBe(c2.id);
    });

    it('does not demote primary of different type when creating new primary of another type', async () => {
        const repo = new PgContactRepository(pool);
        // seed two types each with one primary
        const emailPrimary = await repo.create('u1', { type: 'email', value: 'primary@a.com', isPrimary: true });
        const phonePrimary = await repo.create('u1', { type: 'phone', value: '111-222', isPrimary: true });
        expect(emailPrimary.is_primary).toBe(true);
        expect(phonePrimary.is_primary).toBe(true);

        // Add another phone primary, should demote previous phone but not email
        const newPhonePrimary = await repo.create('u1', { type: 'phone', value: '333-444', isPrimary: true });
        const all = await repo.findByOwner('u1');
        const emailRecords = all.filter(c => c.type === 'email');
        const phoneRecords = all.filter(c => c.type === 'phone');
        expect(emailRecords.filter(c => c.is_primary)).toHaveLength(1);
        expect(phoneRecords.filter(c => c.is_primary)).toHaveLength(1);
        // Email primary unchanged
        expect(emailRecords.find(c => c.is_primary)?.id).toBe(emailPrimary.id);
        // New phone primary is the active one
        expect(phoneRecords.find(c => c.is_primary)?.id).toBe(newPhonePrimary.id);
    });

    it('updates worker profile mapped columns', async () => {
        const repo = new PgProfileRepository(pool);
        const updated = await repo.updateWorkerProfile('u1', { experienceYears: 6, description: 'Updated desc' });
        expect(updated.experience_years).toBe(6);
        expect(updated.description).toBe('Updated desc');
    });
});
