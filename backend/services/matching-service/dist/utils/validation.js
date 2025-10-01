"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWeights = void 0;
const matching_1 = require("./matching");
// Validate an incoming weights object. Each weight must be a finite number between 0 and 200.
// We also cap the total sum to a reasonable limit (e.g., 300) to avoid runaway scoring.
const validateWeights = (input) => {
    if (!input)
        return { ok: true, weights: undefined };
    if (typeof input !== 'object') {
        return { ok: false, error: 'weights must be an object' };
    }
    const result = {};
    let sum = 0;
    for (const key of Object.keys(input)) {
        const val = input[key];
        if (val === undefined || val === null)
            continue;
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
    const merged = { ...matching_1.defaultWeights, ...result };
    return { ok: true, weights: merged };
};
exports.validateWeights = validateWeights;
//# sourceMappingURL=validation.js.map