import { MatchCriteria, LocationCoordinates, MatchWeights } from '../types';
export declare const defaultWeights: MatchWeights;
export declare const calculateWorkerMatchScore: (worker: any, workerLocation: LocationCoordinates, criteria: MatchCriteria, criteriaLocation: LocationCoordinates, weights?: MatchWeights) => number;
export declare const calculateContractorMatchScore: (contractor: any, contractorLocation: LocationCoordinates, criteria: MatchCriteria, criteriaLocation: LocationCoordinates, weights?: MatchWeights) => number;
export declare const sortMatchesByScore: <T extends {
    matchScore: number;
}>(matches: T[]) => T[];
export declare const filterByMinimumScore: <T extends {
    matchScore: number;
}>(matches: T[], minimumScore?: number) => T[];
