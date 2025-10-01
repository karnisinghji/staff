import { validateWeights } from '../../utils/validation';

describe('validateWeights', () => {
    it('accepts undefined or empty', () => {
        expect(validateWeights(undefined).ok).toBe(true);
        expect(validateWeights(null).ok).toBe(true);
    });

    it('rejects non-object', () => {
        expect(validateWeights('string' as any).ok).toBe(false);
    });

    it('rejects negative or non-finite values', () => {
        expect(validateWeights({ skill: -5 }).ok).toBe(false);
        expect(validateWeights({ skill: Infinity }).ok).toBe(false);
    });

    it('rejects sum > 300', () => {
        expect(validateWeights({ skill: 200, distance: 200 }).ok).toBe(false);
    });

    it('merges with defaults when valid', () => {
        const res = validateWeights({ skill: 50 });
        expect(res.ok).toBe(true);
        expect(res.weights).toBeDefined();
        expect((res.weights as any).skill).toBe(50);
    });
});
