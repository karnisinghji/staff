import Joi from 'joi';
import { UserRole, SkillType } from '../types';

// User validation schemas
export const userSignupSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]{10,15}$/).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid(...Object.values(UserRole)).required(),
    location: Joi.string().min(2).max(100).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// Worker profile validation
export const workerProfileSchema = Joi.object({
    skillType: Joi.string().valid(...Object.values(SkillType)).required(),
    experienceYears: Joi.number().min(0).max(50).required(),
    hourlyRate: Joi.number().min(0).optional(),
    bio: Joi.string().max(500).optional(),
});

// Contractor profile validation
export const contractorProfileSchema = Joi.object({
    companyName: Joi.string().max(100).optional(),
});

// Job validation
export const jobCreateSchema = Joi.object({
    workerId: Joi.string().uuid().required(),
    jobType: Joi.string().valid(...Object.values(SkillType)).required(),
    description: Joi.string().max(1000).optional(),
    location: Joi.string().max(200).optional(),
    estimatedDuration: Joi.number().min(1).optional(),
    agreedPrice: Joi.number().min(0).optional(),
});

// Pagination validation
export const paginationSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
});

// Location search validation
export const locationSearchSchema = Joi.object({
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional(),
    city: Joi.string().max(100).optional(),
    radius: Joi.number().min(1).max(100).default(10), // km
});

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: any, res: any, next: any) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        }
        req.body = value;
        next();
    };
};