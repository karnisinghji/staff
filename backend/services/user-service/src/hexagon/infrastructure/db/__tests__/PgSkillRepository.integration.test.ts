import { newDb } from 'pg-mem';
import { PgSkillRepository } from '../PgRepositories';

function makePool(withTable: boolean) {
    const db = newDb();
    // minimal users & worker_profiles schema needed for fallback (removed gen_random_uuid default for pg-mem compatibility)
    db.public.none(`CREATE TABLE worker_profiles (id uuid, user_id uuid, skill_type text);`);
    if (withTable) {
        db.public.none(`CREATE TABLE skill_types (id serial primary key, name text not null);`);
        db.public.none(`INSERT INTO skill_types(name) VALUES ('carpentry'),('electrical'),('plumbing');`);
    } else {
        // fallback data via worker_profiles
        db.public.none(`INSERT INTO worker_profiles(user_id, skill_type) VALUES ('00000000-0000-0000-0000-000000000001','roofing'),('00000000-0000-0000-0000-000000000002','plumbing'),('00000000-0000-0000-0000-000000000003','plumbing');`);
    }
    const adapter = db.adapters.createPg();
    return new adapter.Pool();
}

describe('PgSkillRepository integration', () => {
    it('returns ordered names from skill_types table when present', async () => {
        const pool = makePool(true);
        const repo = new PgSkillRepository(pool as any);
        const list = await repo.listSkillTypes();
        expect(list).toEqual(['carpentry', 'electrical', 'plumbing']);
    });
    it('falls back to distinct worker_profiles.skill_type when table absent', async () => {
        const pool = makePool(false);
        const repo = new PgSkillRepository(pool as any);
        const list = await repo.listSkillTypes();
        expect(list).toEqual(['plumbing', 'roofing']); // sorted alpha
    });
    it('returns empty when neither table nor any skills present', async () => {
        const db = newDb();
        db.public.none(`CREATE TABLE worker_profiles (id uuid, user_id uuid, skill_type text);`);
        const adapter = db.adapters.createPg();
        const pool = new adapter.Pool();
        const repo = new PgSkillRepository(pool as any);
        const list = await repo.listSkillTypes();
        expect(list).toEqual([]);
    });
});
