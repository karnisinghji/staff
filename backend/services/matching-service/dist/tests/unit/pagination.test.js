"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const MatchingService_1 = require("../../services/MatchingService");
const locationUtil = __importStar(require("../../utils/location"));
// We'll stub geocodeLocation to return fixed coords and stub the DB pool by monkeypatching the pool used in MatchingService module.
describe('MatchingService pagination behavior', () => {
    const backupGeocode = locationUtil.geocodeLocation;
    beforeAll(() => {
        // stub geocodeLocation to return New York coords
        locationUtil.geocodeLocation = async (loc) => ({ latitude: 40.7128, longitude: -74.0060 });
    });
    afterAll(() => {
        locationUtil.geocodeLocation = backupGeocode;
    });
    it('returns empty matches for page beyond totalPages', async () => {
        // Create a MatchingService instance and monkeypatch its pool.query to return 3 workers
        const svc = new MatchingService_1.MatchingService();
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
            query: async () => ({ rows: sampleRows, rowCount: sampleRows.length, command: 'SELECT' })
        };
        const criteria = { skillType: 'carpenter', location: 'New York', maxDistance: 50, page: 10, limit: 5 };
        const result = await svc.findWorkersForCriteria(criteria);
        expect(result.totalCount).toBe(3);
        expect(result.matches.length).toBe(0);
        expect(result.page).toBe(10);
    });
    it('caps limit to configured max (100)', async () => {
        const svc = new MatchingService_1.MatchingService();
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
            query: async () => ({ rows: sampleRows, rowCount: sampleRows.length, command: 'SELECT' })
        };
        const criteria = { skillType: 'carpenter', location: 'New York', maxDistance: 50, page: 1, limit: 1000 };
        const result = await svc.findWorkersForCriteria(criteria);
        expect(result.totalCount).toBe(200);
        // capped to 100
        expect(result.limit).toBeLessThanOrEqual(100);
        expect(result.matches.length).toBe(result.limit);
    });
});
//# sourceMappingURL=pagination.test.js.map