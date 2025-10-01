"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryMatchingRepository = void 0;
class InMemoryMatchingRepository {
    constructor() {
        this.workers = [];
        this.contractors = [];
        this.preferences = {};
        this.matches = [];
        this.weightConfig = {};
    }
    async findWorkers(criteria) {
        return this.workers.filter(w => {
            if (criteria.skills && criteria.skills.length) {
                return w.skills.some(s => criteria.skills.includes(s));
            }
            return true;
        });
    }
    async findContractors(criteria) {
        return this.contractors.filter(c => {
            if (criteria.skillsNeeded && criteria.skillsNeeded.length) {
                return criteria.skillsNeeded.some(s => c.skillsNeeded?.includes(s));
            }
            return true;
        });
    }
    async upsertPreferences(prefs) {
        this.preferences[prefs.userId] = prefs;
    }
    async getPreferences(userId) {
        return this.preferences[userId] || null;
    }
    async saveMatch(match) {
        this.matches.push(match);
    }
    async listSavedMatches(userId, pagination) {
        const all = this.matches.filter(m => m.userA === userId || m.userB === userId);
        const start = (pagination.page - 1) * pagination.pageSize;
        const slice = all.slice(start, start + pagination.pageSize);
        return { matches: slice, total: all.length, page: pagination.page, pageSize: pagination.pageSize };
    }
    async deleteSavedMatch(userId, matchId) {
        const idx = this.matches.findIndex(m => m.id === matchId && (m.userA === userId || m.userB === userId));
        if (idx >= 0) {
            this.matches.splice(idx, 1);
            return true;
        }
        return false;
    }
    async getStats() {
        return { totalMatches: this.matches.length, workerCount: this.workers.length, contractorCount: this.contractors.length };
    }
    async updateWeightConfig(config) {
        this.weightConfig = { ...this.weightConfig, ...config };
    }
    async getWeightConfig() {
        return { ...this.weightConfig };
    }
}
exports.InMemoryMatchingRepository = InMemoryMatchingRepository;
//# sourceMappingURL=InMemoryMatchingRepository.js.map