export interface WorkerCandidate {
    id: string;
    skills: string[];
    distanceKm?: number;
    score?: number;
}
export interface ContractorCandidate {
    id: string;
    skillsNeeded: string[];
    distanceKm?: number;
    score?: number;
}
