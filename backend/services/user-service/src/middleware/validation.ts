import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

// Accept any Zod schema including refinements/effects
export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse(req.body);
        req.body = parsed;
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({ success: false, message: 'Validation failed', errors: err.errors });
            return;
        }
        next(err);
    }
};
