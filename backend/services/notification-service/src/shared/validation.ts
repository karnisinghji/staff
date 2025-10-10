import { ZodSchema, ZodError } from 'zod';
import { RequestHandler } from 'express';

export interface ValidationOptions<T> {
    schema: ZodSchema<T>;
    target?: 'body' | 'query' | 'params';
    strip?: boolean; // if true, use schema.parse; else safeParse keep unknowns
}

export function validate<T>({ schema, target = 'body', strip = true }: ValidationOptions<T>): RequestHandler {
    return (req, res, next) => {
        const data = (req as any)[target];
        const result = strip ? (() => { try { return { success: true as const, data: schema.parse(data) }; } catch (e) { return { success: false as const, error: e }; } })() : schema.safeParse(data);
        if (!result.success) {
            const zerr = result.error as ZodError;
            return res.status(400).json({ success: false, message: 'Validation failed', issues: zerr.issues.map(i => ({ path: i.path.join('.'), code: i.code, message: i.message })) });
        }
        (req as any)[target] = (result as any).data;
        return next();
    };
}
