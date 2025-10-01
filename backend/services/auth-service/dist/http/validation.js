"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
exports.validate = validate;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'Email is required' }).email('Invalid email format').optional(),
    username: zod_1.z.string().optional(), // Accept any string (email or phone number)
    password: zod_1.z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters'),
    roles: zod_1.z.array(zod_1.z.string()).nonempty('At least one role required').optional().transform(v => v || undefined),
    role: zod_1.z.string().optional() // Support singular role from frontend
}).refine(data => data.email || data.username, {
    message: 'Either email or username is required',
    path: ['email']
}).transform(data => ({
    email: data.email || data.username,
    password: data.password,
    roles: data.roles || (data.role ? [data.role] : undefined)
}));
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    username: zod_1.z.string().optional(), // Accept any string (email or phone number)
    password: zod_1.z.string().min(8)
}).refine(data => data.email || data.username, {
    message: 'Either email or username is required',
    path: ['email']
}).transform(data => ({
    email: data.email || data.username,
    password: data.password
}));
function normalizeIssues(issues) {
    const norm = issues.map(i => ({
        field: i.path.length ? i.path.join('.') : '_root',
        code: i.code,
        message: i.message
    }));
    const fields = {};
    for (const n of norm) {
        if (!(n.field in fields))
            fields[n.field] = n.message;
    }
    return { issues: norm, fields };
}
function validate(schema, options) {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            if (options?.structured !== false) {
                const { issues, fields } = normalizeIssues(parsed.error.issues);
                return res.status(400).json({
                    success: false,
                    error: { code: 'VALIDATION_ERROR', message: 'Invalid request body' },
                    fields,
                    issues
                });
            }
            return res.status(400).json({ error: 'Validation failed', issues: parsed.error.issues });
        }
        req.body = parsed.data;
        next();
    };
}
//# sourceMappingURL=validation.js.map