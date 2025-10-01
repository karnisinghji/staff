import { ZodSchema } from 'zod';
import { RequestHandler } from 'express';
export interface ValidationOptions<T> {
    schema: ZodSchema<T>;
    target?: 'body' | 'query' | 'params';
    strip?: boolean;
}
export declare function validate<T>({ schema, target, strip }: ValidationOptions<T>): RequestHandler;
