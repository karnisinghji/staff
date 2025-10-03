import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
export declare const registerSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    roles: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>, [string, ...string[]] | undefined, [string, ...string[]] | undefined>;
    role: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    password: string;
    email?: string | undefined;
    roles?: [string, ...string[]] | undefined;
    username?: string | undefined;
    role?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    roles?: [string, ...string[]] | undefined;
    username?: string | undefined;
    role?: string | undefined;
}>, {
    password: string;
    email?: string | undefined;
    roles?: [string, ...string[]] | undefined;
    username?: string | undefined;
    role?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    roles?: [string, ...string[]] | undefined;
    username?: string | undefined;
    role?: string | undefined;
}>, {
    email: string | undefined;
    password: string;
    roles: [string, ...string[]] | undefined;
}, {
    password: string;
    email?: string | undefined;
    roles?: [string, ...string[]] | undefined;
    username?: string | undefined;
    role?: string | undefined;
}>;
export declare const loginSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>, {
    email: string | undefined;
    password: string;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>;
export declare function validate(schema: z.ZodSchema<any>, options?: {
    structured?: boolean;
}): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
