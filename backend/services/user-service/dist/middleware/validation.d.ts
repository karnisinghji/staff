import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
export declare const validateBody: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => void;
