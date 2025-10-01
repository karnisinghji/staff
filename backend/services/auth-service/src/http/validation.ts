import { z, ZodIssue } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const registerSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format').optional(),
    username: z.string().optional(), // Accept any string (email or phone number)
    password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters'),
    roles: z.array(z.string()).nonempty('At least one role required').optional().transform(v => v || undefined),
    role: z.string().optional() // Support singular role from frontend
}).refine(data => data.email || data.username, {
    message: 'Either email or username is required',
    path: ['email']
}).transform(data => ({
    email: data.email || data.username,
    password: data.password,
    roles: data.roles || (data.role ? [data.role] : undefined)
}));

export const loginSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().optional(), // Accept any string (email or phone number)
    password: z.string().min(8)
}).refine(data => data.email || data.username, {
    message: 'Either email or username is required',
    path: ['email']
}).transform(data => ({
    email: data.email || data.username,
    password: data.password
}));

interface NormalizedIssue {
    field: string;
    code: string;
    message: string;
}

function normalizeIssues(issues: ZodIssue[]): { issues: NormalizedIssue[]; fields: Record<string, string> } {
    const norm: NormalizedIssue[] = issues.map(i => ({
        field: i.path.length ? i.path.join('.') : '_root',
        code: i.code,
        message: i.message
    }));
    const fields: Record<string, string> = {};
    for (const n of norm) {
        if (!(n.field in fields)) fields[n.field] = n.message;
    }
    return { issues: norm, fields };
}

export function validate(schema: z.ZodSchema<any>, options?: { structured?: boolean }) {
    return (req: Request, res: Response, next: NextFunction) => {
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
