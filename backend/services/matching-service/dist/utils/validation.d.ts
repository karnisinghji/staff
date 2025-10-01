import { MatchWeights } from '../types';
export interface ValidatedWeightsResult {
    ok: boolean;
    weights?: MatchWeights;
    error?: string;
}
export declare const validateWeights: (input: any) => ValidatedWeightsResult;
