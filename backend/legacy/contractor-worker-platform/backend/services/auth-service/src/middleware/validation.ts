import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Signup validation schema
const signupSchema = Joi.object({
    username: Joi.string().required(), // can be email or mobile
    password: Joi.string().min(6).max(128).required(),
    role: Joi.string().valid('contractor', 'worker').required()
});

// Login validation schema
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Password change validation schema
const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).max(128).required()
});

// Profile update validation schema
const updateProfileSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
    location: Joi.string().min(2).max(100).optional()
});

// Generic validation middleware
const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body);

        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errorMessage
            });
            return;
        }

        next();
    };
};

// Export validation middlewares
export const validateSignup = validate(signupSchema);
export const validateLogin = validate(loginSchema);
export const validateChangePassword = validate(changePasswordSchema);
export const validateUpdateProfile = validate(updateProfileSchema);