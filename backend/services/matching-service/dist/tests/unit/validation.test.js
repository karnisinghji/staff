"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../utils/validation");
describe('validateWeights', () => {
    it('accepts undefined or empty', () => {
        expect((0, validation_1.validateWeights)(undefined).ok).toBe(true);
        expect((0, validation_1.validateWeights)(null).ok).toBe(true);
    });
    it('rejects non-object', () => {
        expect((0, validation_1.validateWeights)('string').ok).toBe(false);
    });
    it('rejects negative or non-finite values', () => {
        expect((0, validation_1.validateWeights)({ skill: -5 }).ok).toBe(false);
        expect((0, validation_1.validateWeights)({ skill: Infinity }).ok).toBe(false);
    });
    it('rejects sum > 300', () => {
        expect((0, validation_1.validateWeights)({ skill: 200, distance: 200 }).ok).toBe(false);
    });
    it('merges with defaults when valid', () => {
        const res = (0, validation_1.validateWeights)({ skill: 50 });
        expect(res.ok).toBe(true);
        expect(res.weights).toBeDefined();
        expect(res.weights.skill).toBe(50);
    });
});
//# sourceMappingURL=validation.test.js.map