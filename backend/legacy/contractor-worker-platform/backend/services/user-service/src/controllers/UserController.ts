import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { logger } from '../utils/logger';
import { AuthUser } from '../types';

interface AuthRequest extends Request {
    user?: AuthUser;
}

export class UserController {
    // Update worker profile
    updateWorkerProfile = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }
            if (req.user.role !== 'worker') {
                res.status(403).json({
                    success: false,
                    message: 'Only workers can update worker profiles'
                });
                return;
            }
            const { skillType, experienceYears, hourlyRate, availability, description, isAvailable } = req.body;
            const updates = { skillType, experienceYears, hourlyRate, availability, description, isAvailable };
            // Remove undefined values
            Object.keys(updates).forEach(key => {
                if (updates[key as keyof typeof updates] === undefined) {
                    delete updates[key as keyof typeof updates];
                }
            });
            if (Object.keys(updates).length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'No valid update fields provided'
                });
                return;
            }
            const updatedProfile = await this.userService.updateWorkerProfile(req.user.id, updates);
            // (No-op: success response is already sent above, this is unreachable)
        } catch (error) {
            logger.error('Error updating worker profile:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating worker profile',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Get current user profile
    getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const profile = await this.userService.getCompleteUserProfile(req.user.id);

            res.json({
                success: true,
                message: 'User profile retrieved successfully',
                data: profile
            });
        } catch (error) {
            logger.error('Error getting current user:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving user profile',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get user by ID (for contractors to view worker profiles, etc.)
    getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const profile = await this.userService.getCompleteUserProfile(id);

            // Remove sensitive information when viewing other users
            const { user, contacts, profile: roleProfile } = profile;
            const publicProfile = {
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    location: user.location,
                    isActive: user.isActive,
                    createdAt: user.createdAt
                },
                contacts: contacts.filter((contact: any) => !contact.is_primary || contact.type !== 'email'),
                profile: roleProfile
            };

            res.json({
                success: true,
                message: 'User profile retrieved successfully',
                data: publicProfile
            });
        } catch (error) {
            logger.error('Error getting user by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving user profile',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Update user profile
    updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                    return;
                }

                const { name, phone, location, email, address } = req.body;
                const updates = { name, phone, location, email, address };

                // Remove undefined values
                Object.keys(updates).forEach(key => {
                    if (updates[key as keyof typeof updates] === undefined) {
                        delete updates[key as keyof typeof updates];
                    }
                });

                if (Object.keys(updates).length === 0) {
                    res.status(400).json({
                        success: false,
                        message: 'No valid update fields provided'
                    });
                    return;
                }

                const updatedUser = await this.userService.updateUser(req.user.id, updates);

                res.json({
                    success: true,
                    message: 'User profile updated successfully',
                    data: updatedUser
                });
            } catch (error: any) {
                logger.error('Error updating user:', error);
                // Handle unique constraint errors
                if (error?.code === '23505') {
                    if (error.constraint && error.constraint.includes('users_email_unique')) {
                        res.status(400).json({
                            success: false,
                            message: 'This email already exists.'
                        });
                        return;
                    }
                    if (error.constraint && error.constraint.includes('users_phone_unique')) {
                        res.status(400).json({
                            success: false,
                            message: 'This mobile number already exists.'
                        });
                        return;
                    }
                }
                // Handle thrown duplicate errors from service
                if (typeof error?.message === 'string' && error.message.includes('already in use')) {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                    return;
                }
                res.status(500).json({
                    success: false,
                    message: 'Failed to update user',
                    error: error instanceof Error ? error.message : error
                });
            }
            // (No-op: success response is already sent above, this is unreachable)
        } catch (error) {
            logger.error('Error updating worker profile:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating worker profile',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Update contractor profile
    updateContractorProfile = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            if (req.user.role !== 'contractor') {
                res.status(403).json({
                    success: false,
                    message: 'Only contractors can update contractor profiles'
                });
                return;
            }

            const { companyName, companyDescription } = req.body;
            const updates = { companyName, companyDescription };

            // Remove undefined values
            Object.keys(updates).forEach(key => {
                if (updates[key as keyof typeof updates] === undefined) {
                    delete updates[key as keyof typeof updates];
                }
            });

            if (Object.keys(updates).length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'No valid update fields provided'
                });
                return;
            }

            const updatedProfile = await this.userService.updateContractorProfile(req.user.id, updates);

            res.json({
                success: true,
                message: 'Contractor profile updated successfully',
                data: updatedProfile
            });
        } catch (error) {
            logger.error('Error updating contractor profile:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating contractor profile',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Get user contacts
    getContacts = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const contacts = await this.userService.getUserContacts(req.user.id);

            res.json({
                success: true,
                message: 'Contacts retrieved successfully',
                data: contacts
            });
        } catch (error) {
            logger.error('Error getting contacts:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving contacts',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Create contact
    createContact = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const { type, value, isPrimary } = req.body;

            if (!type || !value) {
                res.status(400).json({
                    success: false,
                    message: 'Type and value are required'
                });
                return;
            }

            const contact = await this.userService.createContact(req.user.id, { type, value, isPrimary });

            res.status(201).json({
                success: true,
                message: 'Contact created successfully',
                data: contact
            });
        } catch (error) {
            logger.error('Error creating contact:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating contact',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Update contact
    updateContact = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const { contactId } = req.params;
            const { type, value, isPrimary } = req.body;

            const updates = { type, value, isPrimary };

            // Remove undefined values
            Object.keys(updates).forEach(key => {
                if (updates[key as keyof typeof updates] === undefined) {
                    delete updates[key as keyof typeof updates];
                }
            });

            if (Object.keys(updates).length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'No valid update fields provided'
                });
                return;
            }

            const updatedContact = await this.userService.updateContact(contactId, req.user.id, updates);

            res.json({
                success: true,
                message: 'Contact updated successfully',
                data: updatedContact
            });
        } catch (error) {
            logger.error('Error updating contact:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating contact',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Delete contact
    deleteContact = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const { contactId } = req.params;

            await this.userService.deleteContact(contactId, req.user.id);

            res.json({
                success: true,
                message: 'Contact deleted successfully'
            });
        } catch (error) {
            logger.error('Error deleting contact:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting contact',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}