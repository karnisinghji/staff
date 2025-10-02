import { z } from 'zod';

export const updateUserSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    phone: z.string()
        .regex(/^\+91[6-9]\d{9}$/, 'Phone number must be in format +91xxxxxxxxxx (10 digits starting with 6-9)')
        .optional(),
    location: z.string().min(2).max(100).optional(),
    address: z.string().max(500).optional(),
    username: z.string().email().optional(), // Allow username updates (admin-only check in controller)
    email: z.string().email().optional() // Allow email updates - users can add email if registered with phone
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });

export const updateWorkerProfileSchema = z.object({
    skillType: z.string().min(1).max(50).optional(),
    experienceYears: z.union([z.number(), z.string().transform(val => val === '' ? undefined : parseInt(val, 10))]).pipe(z.number().int().min(0).max(60)).optional(),
    // hourlyRate: z.union([z.number(), z.string().transform(val => val === '' ? undefined : parseFloat(val))]).pipe(z.number().min(0).max(10000)).optional(), // DISABLED - not required at this time
    availability: z.string().min(1).max(120).optional(),
    description: z.string().min(1).max(500).optional(),
    isAvailable: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });

export const updateContractorProfileSchema = z.object({
    companyName: z.string().min(1).max(120).optional(),
    companyDescription: z.string().min(1).max(1000).optional()
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });

export const createContactSchema = z.object({
    type: z.string().min(2).max(40),
    value: z.string().min(1).max(200),
    isPrimary: z.boolean().optional()
});

export const updateContactSchema = z.object({
    type: z.string().min(2).max(40).optional(),
    value: z.string().min(1).max(200).optional(),
    isPrimary: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });

export const forgotPasswordSchema = z.object({
    email: z.string().email()
});
