import { defaultWeights } from './matching';
import { MatchWeights } from '../types';

export interface ValidatedWeightsResult {
    ok: boolean;
    weights?: MatchWeights;
    error?: string;
}

// Validate an incoming weights object. Each weight must be a finite number between 0 and 200.
// We also cap the total sum to a reasonable limit (e.g., 300) to avoid runaway scoring.
export const validateWeights = (input: any): ValidatedWeightsResult => {
    if (!input) return { ok: true, weights: undefined };

    if (typeof input !== 'object') {
        return { ok: false, error: 'weights must be an object' };
    }

    const result: any = {};
    let sum = 0;

    for (const key of Object.keys(input)) {
        const val = input[key];
        if (val === undefined || val === null) continue;
        if (typeof val !== 'number' || !Number.isFinite(val) || val < 0) {
            return { ok: false, error: `weight ${key} must be a non-negative finite number` };
        }
        // cap individual weight
        const capped = Math.min(val, 200);
        result[key] = capped;
        sum += capped;
    }

    if (sum > 300) {
        return { ok: false, error: `sum of weights too large (${sum}), must be <= 300` };
    }

    // Merge with defaults so all expected keys exist
    const merged = { ...defaultWeights, ...result } as MatchWeights;
    return { ok: true, weights: merged };
};
