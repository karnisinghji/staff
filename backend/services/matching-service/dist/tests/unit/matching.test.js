"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matching_1 = require("../../utils/matching");
describe('calculateWorkerMatchScore', () => {
    it('gives high score for exact skill match and within budget', () => {
        const worker = {
            skill_type: 'carpenter',
            experience_years: 5,
            hourly_rate: 30,
            rating: 4.5,
            is_available: true
        };
        const workerLocation = { latitude: 40.7128, longitude: -74.0060 };
        const criteria = {
            skillType: 'carpenter',
            maxDistance: 50,
            budgetRange: { min: 20, max: 40 },
            experienceLevel: 'intermediate'
        };
        const criteriaLocation = { latitude: 40.7128, longitude: -74.0060 };
        const score = (0, matching_1.calculateWorkerMatchScore)(worker, workerLocation, criteria, criteriaLocation);
        expect(score).toBeGreaterThanOrEqual(70);
    });
    it('gives low score when out of budget and different skill', () => {
        const worker = {
            skill_type: 'plumber',
            experience_years: 1,
            hourly_rate: 100,
            rating: 2.0,
            is_available: false
        };
        const workerLocation = { latitude: 40.7128, longitude: -74.0060 };
        const criteria = {
            skillType: 'carpenter',
            maxDistance: 50,
            budgetRange: { min: 20, max: 50 },
            experienceLevel: 'intermediate'
        };
        const criteriaLocation = { latitude: 40.7128, longitude: -74.0060 };
        const score = (0, matching_1.calculateWorkerMatchScore)(worker, workerLocation, criteria, criteriaLocation);
        expect(score).toBeLessThan(50);
    });
    it('respects weight overrides (increases skill weight)', () => {
        const worker = {
            skill_type: 'carpenter',
            experience_years: 2,
            hourly_rate: 30,
            rating: 4.0,
            is_available: true
        };
        const workerLocation = { latitude: 40.7128, longitude: -74.0060 };
        const criteria = {
            skillType: 'carpenter',
            maxDistance: 50,
            budgetRange: { min: 20, max: 40 },
            experienceLevel: 'intermediate',
            weights: { skill: 80, distance: 5, experience: 5, rating: 5 }
        };
        const criteriaLocation = { latitude: 40.7128, longitude: -74.0060 };
        const baseScore = require('../../utils/matching').calculateWorkerMatchScore(worker, workerLocation, { ...criteria, weights: undefined }, criteriaLocation);
        const weightedScore = require('../../utils/matching').calculateWorkerMatchScore(worker, workerLocation, criteria, criteriaLocation);
        expect(weightedScore).toBeGreaterThanOrEqual(baseScore);
    });
});
//# sourceMappingURL=matching.test.js.map