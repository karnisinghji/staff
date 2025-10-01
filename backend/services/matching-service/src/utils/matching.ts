import {
    WorkerMatch,
    ContractorMatch,
    MatchCriteria,
    LocationCoordinates,
    MatchWeights
} from '../types';
import { calculateDistance } from './location';

export const defaultWeights: MatchWeights = {
    skill: 40,
    distance: 25,
    experience: 15,
    budget: 10,
    rating: 7,
    availability: 3,
    verification: 25,
    jobHistory: 15
};

export const calculateWorkerMatchScore = (
    worker: any,
    workerLocation: LocationCoordinates,
    criteria: MatchCriteria,
    criteriaLocation: LocationCoordinates,
    weights?: MatchWeights
): number => {
    const w = { ...defaultWeights, ...(weights || {}) } as Required<MatchWeights>;

    let score = 0;

    // Skill type match
    if (worker.skill_type === criteria.skillType) {
        score += w.skill;
    } else if (worker.skill_type && criteria.skillType) {
        // Partial match for related skills (half weight)
        const relatedSkills = {
            'carpenter': ['construction', 'renovation'],
            'plumber': ['maintenance', 'repair'],
            'electrician': ['maintenance', 'repair'],
            'painter': ['renovation', 'decoration'],
            'landscaper': ['gardening', 'maintenance']
        };

        const workerSkillLower = worker.skill_type.toLowerCase();
        const criteriaSkillLower = (criteria.skillType || '').toLowerCase();

        if (relatedSkills[workerSkillLower as keyof typeof relatedSkills]?.includes(criteriaSkillLower) ||
            relatedSkills[criteriaSkillLower as keyof typeof relatedSkills]?.includes(workerSkillLower)) {
            score += Math.round(w.skill / 2);
        }
    }

    // Distance
    const distance = calculateDistance(workerLocation, criteriaLocation);
    if (distance <= criteria.maxDistance) {
        const distanceScore = Math.max(0, w.distance - (distance / criteria.maxDistance) * w.distance);
        score += distanceScore;
    }

    // Experience
    const experienceYears = worker.experience_years || 0;
    let experienceScore = 0;

    switch (criteria.experienceLevel) {
        case 'beginner':
            experienceScore = experienceYears <= 2 ? w.experience : Math.max(0, w.experience - (experienceYears - 2) * 2);
            break;
        case 'intermediate':
            experienceScore = experienceYears >= 2 && experienceYears <= 7 ? w.experience :
                experienceYears < 2 ? experienceYears * Math.round(w.experience / 2) : Math.max(0, w.experience - (experienceYears - 7));
            break;
        case 'expert':
            experienceScore = experienceYears >= 5 ? Math.min(w.experience, experienceYears * 2) : experienceYears * 2;
            break;
        default:
            experienceScore = Math.min(w.experience, experienceYears * 2);
    }
    score += experienceScore;

    // Budget
    if (criteria.budgetRange && worker.hourly_rate) {
        if (worker.hourly_rate >= criteria.budgetRange.min && worker.hourly_rate <= criteria.budgetRange.max) {
            score += w.budget;
        } else if (worker.hourly_rate < criteria.budgetRange.min) {
            score += Math.round(w.budget * 0.8);
        }
    }

    // Rating
    const rating = worker.rating || 0;
    score += (rating / 5) * w.rating;

    // Availability
    if (worker.is_available) {
        score += w.availability;
    }

    return Math.min(100, Math.round(score));
};

export const calculateContractorMatchScore = (
    contractor: any,
    contractorLocation: LocationCoordinates,
    criteria: MatchCriteria,
    criteriaLocation: LocationCoordinates,
    weights?: MatchWeights
): number => {
    const w = { ...defaultWeights, ...(weights || {}) } as Required<MatchWeights>;

    let score = 0;

    // Location proximity
    const distance = calculateDistance(contractorLocation, criteriaLocation);
    if (distance <= criteria.maxDistance) {
        const distanceScore = Math.max(0, w.distance + 10 - (distance / criteria.maxDistance) * (w.distance + 10));
        score += distanceScore;
    }

    // Verification status
    const verified = contractor.need_worker_status || contractor.verification_status === 'verified';
    if (verified) {
        score += w.verification;
    } else if (contractor.verification_status === 'pending') {
        score += Math.round(w.verification * 0.4);
    }

    // Rating
    const rating = contractor.rating || 0;
    score += (rating / 5) * w.rating;

    // Job posting history
    const totalJobs = contractor.total_projects || 0;
    if (totalJobs > 0) {
        score += Math.min(w.jobHistory, totalJobs * 2);
    }

    // Budget compatibility (light boost if provided)
    if (criteria.budgetRange) {
        score += Math.round((w.budget || 5) * 0.5);
    }

    return Math.min(100, Math.round(score));
};

export const sortMatchesByScore = <T extends { matchScore: number }>(matches: T[]): T[] => {
    return matches.sort((a, b) => b.matchScore - a.matchScore);
};

export const filterByMinimumScore = <T extends { matchScore: number }>(
    matches: T[],
    minimumScore: number = 30
): T[] => {
    return matches.filter(match => match.matchScore >= minimumScore);
};