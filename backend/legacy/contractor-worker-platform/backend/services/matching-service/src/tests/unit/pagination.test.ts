import { MatchingService } from '../../services/MatchingService';
import * as locationUtil from '../../utils/location';

// We'll stub geocodeLocation to return fixed coords and stub the DB pool by monkeypatching the pool used in MatchingService module.
describe('MatchingService pagination behavior', () => {
    const backupGeocode = locationUtil.geocodeLocation;

    beforeAll(() => {
        // stub geocodeLocation to return New York coords
        (locationUtil as any).geocodeLocation = async (loc: string) => ({ latitude: 40.7128, longitude: -74.0060 });
    });

    afterAll(() => {
        (locationUtil as any).geocodeLocation = backupGeocode;
    });

    it('returns empty matches for page beyond totalPages', async () => {
        // Create a MatchingService instance and monkeypatch its pool.query to return 3 workers
        const svc = new MatchingService();

        const sampleRows = Array.from({ length: 3 }).map((_, i) => ({
            worker_id: `w-${i}`,
            worker_name: `Worker ${i}`,
            location: 'New York',
            skill_type: 'carpenter',
            experience_years: 10,
            hourly_rate: 30,
            bio: '',
            rating: 5.0,
            total_jobs: 50
        }));

        // @ts-ignore - inject a minimal pool with query method
        svc['pool'] = {
            query: async () => ({ rows: sampleRows, rowCount: sampleRows.length, command: 'SELECT' } as any)
        };

        const criteria: any = { skillType: 'carpenter', location: 'New York', maxDistance: 50, page: 10, limit: 5 };

        const result = await svc.findWorkersForCriteria(criteria);

        expect(result.totalCount).toBe(3);
        expect(result.matches.length).toBe(0);
        expect(result.page).toBe(10);
    });

    it('caps limit to configured max (100)', async () => {
        const svc = new MatchingService();

        const sampleRows = Array.from({ length: 200 }).map((_, i) => ({
            worker_id: `w-${i}`,
            worker_name: `Worker ${i}`,
            location: 'New York',
            skill_type: 'carpenter',
            experience_years: 10,
            hourly_rate: 30,
            bio: '',
            rating: 5.0,
            total_jobs: 50
        }));

        // @ts-ignore - inject a minimal pool with query method
        svc['pool'] = {
            query: async () => ({ rows: sampleRows, rowCount: sampleRows.length, command: 'SELECT' } as any)
        };

        const criteria: any = { skillType: 'carpenter', location: 'New York', maxDistance: 50, page: 1, limit: 1000 };

        const result = await svc.findWorkersForCriteria(criteria);

        expect(result.totalCount).toBe(200);
        // capped to 100
        expect(result.limit).toBeLessThanOrEqual(100);
        expect(result.matches.length).toBe(result.limit);
    });
});
