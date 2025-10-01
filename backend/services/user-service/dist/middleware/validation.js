"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const zod_1 = require("zod");
// Accept any Zod schema including refinements/effects
const validateBody = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse(req.body);
        req.body = parsed;
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({ success: false, message: 'Validation failed', errors: err.errors });
            return;
        }
        next(err);
    }
};
exports.validateBody = validateBody;
//# sourceMappingURL=validation.js.map