// Outbound port if scoring is delegated to an external or isolated component
export interface ScoringPort {
    scoreWorker(criteria: WorkerScoringInput): number;
    scoreContractor(criteria: ContractorScoringInput): number;
}

export interface WorkerScoringInput { skills: string[]; desired: string[]; distanceKm?: number; weightConfig?: Record<string, number>; }
export interface ContractorScoringInput { skillsNeeded: string[]; offered: string[]; distanceKm?: number; weightConfig?: Record<string, number>; }
