import { z } from 'zod';
export declare const updateUserSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    phone?: string | undefined;
    name?: string | undefined;
    username?: string | undefined;
    location?: string | undefined;
    address?: string | undefined;
}, {
    email?: string | undefined;
    phone?: string | undefined;
    name?: string | undefined;
    username?: string | undefined;
    location?: string | undefined;
    address?: string | undefined;
}>, {
    email?: string | undefined;
    phone?: string | undefined;
    name?: string | undefined;
    username?: string | undefined;
    location?: string | undefined;
    address?: string | undefined;
}, {
    email?: string | undefined;
    phone?: string | undefined;
    name?: string | undefined;
    username?: string | undefined;
    location?: string | undefined;
    address?: string | undefined;
}>;
export declare const updateWorkerProfileSchema: z.ZodEffects<z.ZodObject<{
    skillType: z.ZodOptional<z.ZodString>;
    experienceYears: z.ZodOptional<z.ZodNumber>;
    hourlyRate: z.ZodOptional<z.ZodNumber>;
    availability: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    isAvailable: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    skillType?: string | undefined;
    experienceYears?: number | undefined;
    hourlyRate?: number | undefined;
    availability?: string | undefined;
    description?: string | undefined;
    isAvailable?: boolean | undefined;
}, {
    skillType?: string | undefined;
    experienceYears?: number | undefined;
    hourlyRate?: number | undefined;
    availability?: string | undefined;
    description?: string | undefined;
    isAvailable?: boolean | undefined;
}>, {
    skillType?: string | undefined;
    experienceYears?: number | undefined;
    hourlyRate?: number | undefined;
    availability?: string | undefined;
    description?: string | undefined;
    isAvailable?: boolean | undefined;
}, {
    skillType?: string | undefined;
    experienceYears?: number | undefined;
    hourlyRate?: number | undefined;
    availability?: string | undefined;
    description?: string | undefined;
    isAvailable?: boolean | undefined;
}>;
export declare const updateContractorProfileSchema: z.ZodEffects<z.ZodObject<{
    companyName: z.ZodOptional<z.ZodString>;
    companyDescription: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    companyName?: string | undefined;
    companyDescription?: string | undefined;
}, {
    companyName?: string | undefined;
    companyDescription?: string | undefined;
}>, {
    companyName?: string | undefined;
    companyDescription?: string | undefined;
}, {
    companyName?: string | undefined;
    companyDescription?: string | undefined;
}>;
export declare const createContactSchema: z.ZodObject<{
    type: z.ZodString;
    value: z.ZodString;
    isPrimary: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: string;
    isPrimary?: boolean | undefined;
}, {
    value: string;
    type: string;
    isPrimary?: boolean | undefined;
}>;
export declare const updateContactSchema: z.ZodEffects<z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodString>;
    isPrimary: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    value?: string | undefined;
    type?: string | undefined;
    isPrimary?: boolean | undefined;
}, {
    value?: string | undefined;
    type?: string | undefined;
    isPrimary?: boolean | undefined;
}>, {
    value?: string | undefined;
    type?: string | undefined;
    isPrimary?: boolean | undefined;
}, {
    value?: string | undefined;
    type?: string | undefined;
    isPrimary?: boolean | undefined;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
