"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate({ schema, target = 'body', strip = true }) {
    return (req, res, next) => {
        const data = req[target];
        const result = strip ? (() => { try {
            return { success: true, data: schema.parse(data) };
        }
        catch (e) {
            return { success: false, error: e };
        } })() : schema.safeParse(data);
        if (!result.success) {
            const zerr = result.error;
            return res.status(400).json({ success: false, message: 'Validation failed', issues: zerr.issues.map(i => ({ path: i.path.join('.'), code: i.code, message: i.message })) });
        }
        req[target] = result.data;
        return next();
    };
}
//# sourceMappingURL=validation.js.map