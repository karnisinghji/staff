"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = exports.updateContactSchema = exports.createContactSchema = exports.updateContractorProfileSchema = exports.updateWorkerProfileSchema = exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    phone: zod_1.z.string()
        .regex(/^\+91[6-9]\d{9}$/, 'Phone number must be in format +91xxxxxxxxxx (10 digits starting with 6-9)')
        .optional(),
    location: zod_1.z.string().min(2).max(100).optional(),
    address: zod_1.z.string().max(500).optional(),
    username: zod_1.z.string().email().optional(), // Allow username updates (admin-only check in controller)
    email: zod_1.z.string().email().optional() // Allow email updates - users can add email if registered with phone
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });
exports.updateWorkerProfileSchema = zod_1.z.object({
    skillType: zod_1.z.string().min(1).max(50).optional(),
    experienceYears: zod_1.z.union([zod_1.z.number(), zod_1.z.string().transform(val => val === '' ? undefined : parseInt(val, 10))]).pipe(zod_1.z.number().int().min(0).max(60)).optional(),
    // hourlyRate: z.union([z.number(), z.string().transform(val => val === '' ? undefined : parseFloat(val))]).pipe(z.number().min(0).max(10000)).optional(), // DISABLED - not required at this time
    availability: zod_1.z.string().min(1).max(120).optional(),
    description: zod_1.z.string().min(1).max(500).optional(),
    isAvailable: zod_1.z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });
exports.updateContractorProfileSchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1).max(120).optional(),
    companyDescription: zod_1.z.string().min(1).max(1000).optional()
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });
exports.createContactSchema = zod_1.z.object({
    type: zod_1.z.string().min(2).max(40),
    value: zod_1.z.string().min(1).max(200),
    isPrimary: zod_1.z.boolean().optional()
});
exports.updateContactSchema = zod_1.z.object({
    type: zod_1.z.string().min(2).max(40).optional(),
    value: zod_1.z.string().min(1).max(200).optional(),
    isPrimary: zod_1.z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, { message: 'At least one field required' });
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email()
});
//# sourceMappingURL=schemas.js.map