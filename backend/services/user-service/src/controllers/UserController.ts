import { Request, Response } from 'express';
import { getHexContainer } from '../hexagon/bootstrap/container';
import { logger } from '../utils/logger';
import { recordPasswordReset, recordSkillsList } from '../observability/metrics';

export class UserController {
    // Legacy service retained only for: skills list, forgot password (not yet migrated)
    // All profile, contact & completeness logic now uses hexagonal use cases directly (no fallback).
    private hex = getHexContainer();

    constructor() {
    }

    // Get list of skill types
    getSkills = async (_req: Request, res: Response): Promise<void> => {
        const skills = await this.hex.listSkills.execute();
        recordSkillsList();
        res.json({ success: true, data: skills });
    };

    // Forgot password handler
    forgotPassword = async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ success: false, message: 'email is required' });
            return;
        }
        try {
            const result = await this.hex.generatePasswordReset.execute(email);
            logger.info(`Password reset email dispatched (mock) for ${email}`);
            recordPasswordReset('success');
            res.json({ success: true, message: 'Password reset email sent', expiresAt: result.expiresAt });
        } catch (e: any) {
            const notFound = e?.code === 'NOT_FOUND' || /User not found/i.test(e?.message || '');
            if (notFound) {
                recordPasswordReset('not_found');
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }
            recordPasswordReset('error');
            res.status(500).json({ success: false, message: 'Failed to generate password reset' });
        }
    };

    // Get current user profile
    getCurrentUser = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const profile = await this.hex.getCompleteProfile.execute(req.user.id);

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

            const profile = await this.hex.getCompleteProfile.execute(id);
            if (!profile) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }

            // Remove sensitive information when viewing other users
            const { user, contacts, workerProfile, contractorProfile } = profile;
            const roleProfile = workerProfile || contractorProfile;
            const publicProfile = {
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    location: user.location,
                    isActive: (user as any).isActive,
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
    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const { name, phone, location, address, username, email } = req.body;
            const updates: any = { name, phone, location, address };

            // Check if user is admin for sensitive field updates
            const isAdmin = req.user.role === 'admin' || (req.user as any).roles?.includes('admin');

            // Only allow admins to update username (login identifier)
            if (username !== undefined) {
                if (!isAdmin) {
                    res.status(403).json({
                        success: false,
                        message: 'Username can only be modified by administrators'
                    });
                    return;
                }
                updates.username = username;
            }

            // Allow users to update email (e.g., if they registered with phone, they can add email)
            if (email !== undefined) {
                updates.email = email;
            }

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

            const updatedUser = await this.hex.updateUser.execute(req.user.id, updates);

            // Optionally return refreshed completeness meta
            let completenessMeta: any = undefined;
            try {
                const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                completenessMeta = refreshed?.meta;
            } catch { /* ignore meta errors */ }

            res.json({
                success: true,
                message: 'User profile updated successfully',
                data: { user: updatedUser, meta: completenessMeta }
            });
        } catch (error) {
            logger.error('Error updating user:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating user profile',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Update worker profile
    updateWorkerProfile = async (req: Request, res: Response): Promise<void> => {
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

            const updatedProfile = await this.hex.updateWorkerProfile.execute(req.user.id, updates as any);

            let completenessMeta: any = undefined;
            try {
                const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                completenessMeta = refreshed?.meta;
            } catch { }
            res.json({
                success: true,
                message: 'Worker profile updated successfully',
                data: { profile: updatedProfile, meta: completenessMeta }
            });
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
    updateContractorProfile = async (req: Request, res: Response): Promise<void> => {
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

            const updatedProfile = await this.hex.updateContractorProfile.execute(req.user.id, updates as any);

            let completenessMeta: any = undefined;
            try {
                const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                completenessMeta = refreshed?.meta;
            } catch { }
            res.json({
                success: true,
                message: 'Contractor profile updated successfully',
                data: { profile: updatedProfile, meta: completenessMeta }
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
    getContacts = async (req: Request, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const contacts = await this.hex.listContacts.execute(req.user.id);
        res.json({ success: true, message: 'Contacts retrieved successfully', data: contacts });
    };

    // Create contact
    createContact = async (req: Request, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const { type, value, isPrimary } = req.body;
        const contact = await this.hex.createContact.execute(req.user.id, { type, value, isPrimary });
        let completenessMeta: any = undefined;
        try { const refreshed = await this.hex.getCompleteProfile.execute(req.user.id); completenessMeta = refreshed?.meta; } catch { }
        res.status(201).json({ success: true, message: 'Contact created successfully', data: { contact, meta: completenessMeta } });
    };

    // Update contact
    updateContact = async (req: Request, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const { contactId } = req.params;
        const { type, value, isPrimary } = req.body;
        const updates: any = {};
        if (type !== undefined) updates.type = type;
        if (value !== undefined) updates.value = value;
        if (isPrimary !== undefined) updates.isPrimary = isPrimary;
        const updatedContact = await this.hex.updateContact.execute(contactId, req.user.id, updates);
        let completenessMeta: any = undefined;
        try { const refreshed = await this.hex.getCompleteProfile.execute(req.user.id); completenessMeta = refreshed?.meta; } catch { }
        res.json({ success: true, message: 'Contact updated successfully', data: { contact: updatedContact, meta: completenessMeta } });
    };

    // Delete contact
    deleteContact = async (req: Request, res: Response): Promise<void> => {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const { contactId } = req.params;
        await this.hex.deleteContact.execute(contactId, req.user.id);
        let completenessMeta: any = undefined;
        try { const refreshed = await this.hex.getCompleteProfile.execute(req.user.id); completenessMeta = refreshed?.meta; } catch { }
        res.json({ success: true, message: 'Contact deleted successfully', data: { meta: completenessMeta } });
    };
}