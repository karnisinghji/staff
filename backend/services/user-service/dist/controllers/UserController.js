"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const container_1 = require("../hexagon/bootstrap/container");
const logger_1 = require("../utils/logger");
const metrics_1 = require("../observability/metrics");
class UserController {
    constructor() {
        // Legacy service retained only for: skills list, forgot password (not yet migrated)
        // All profile, contact & completeness logic now uses hexagonal use cases directly (no fallback).
        this.hex = (0, container_1.getHexContainer)();
        // Get list of skill types
        this.getSkills = async (_req, res) => {
            const skills = await this.hex.listSkills.execute();
            (0, metrics_1.recordSkillsList)();
            res.json({ success: true, data: skills });
        };
        // Forgot password handler
        this.forgotPassword = async (req, res) => {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ success: false, message: 'email is required' });
                return;
            }
            try {
                const result = await this.hex.generatePasswordReset.execute(email);
                logger_1.logger.info(`Password reset email dispatched (mock) for ${email}`);
                (0, metrics_1.recordPasswordReset)('success');
                res.json({ success: true, message: 'Password reset email sent', expiresAt: result.expiresAt });
            }
            catch (e) {
                const notFound = e?.code === 'NOT_FOUND' || /User not found/i.test(e?.message || '');
                if (notFound) {
                    (0, metrics_1.recordPasswordReset)('not_found');
                    res.status(404).json({ success: false, message: 'User not found' });
                    return;
                }
                (0, metrics_1.recordPasswordReset)('error');
                res.status(500).json({ success: false, message: 'Failed to generate password reset' });
            }
        };
        // Get current user profile
        this.getCurrentUser = async (req, res) => {
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
            }
            catch (error) {
                logger_1.logger.error('Error getting current user:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error retrieving user profile',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get user by ID (for contractors to view worker profiles, etc.)
        this.getUserById = async (req, res) => {
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
                        isActive: user.isActive,
                        createdAt: user.createdAt
                    },
                    contacts: contacts.filter((contact) => !contact.is_primary || contact.type !== 'email'),
                    profile: roleProfile
                };
                res.json({
                    success: true,
                    message: 'User profile retrieved successfully',
                    data: publicProfile
                });
            }
            catch (error) {
                logger_1.logger.error('Error getting user by ID:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error retrieving user profile',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Update user profile
        this.updateUser = async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                    return;
                }
                const { name, phone, location, address, username, email } = req.body;
                const updates = { name, phone, location, address };
                // Check if user is admin for sensitive field updates
                const isAdmin = req.user.role === 'admin' || req.user.roles?.includes('admin');
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
                    if (updates[key] === undefined) {
                        delete updates[key];
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
                let completenessMeta = undefined;
                try {
                    const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                    completenessMeta = refreshed?.meta;
                }
                catch { /* ignore meta errors */ }
                res.json({
                    success: true,
                    message: 'User profile updated successfully',
                    data: { user: updatedUser, meta: completenessMeta }
                });
            }
            catch (error) {
                logger_1.logger.error('Error updating user:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error updating user profile',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Update worker profile
        this.updateWorkerProfile = async (req, res) => {
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
                    if (updates[key] === undefined) {
                        delete updates[key];
                    }
                });
                if (Object.keys(updates).length === 0) {
                    res.status(400).json({
                        success: false,
                        message: 'No valid update fields provided'
                    });
                    return;
                }
                const updatedProfile = await this.hex.updateWorkerProfile.execute(req.user.id, updates);
                let completenessMeta = undefined;
                try {
                    const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                    completenessMeta = refreshed?.meta;
                }
                catch { }
                res.json({
                    success: true,
                    message: 'Worker profile updated successfully',
                    data: { profile: updatedProfile, meta: completenessMeta }
                });
            }
            catch (error) {
                logger_1.logger.error('Error updating worker profile:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error updating worker profile',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Update contractor profile
        this.updateContractorProfile = async (req, res) => {
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
                    if (updates[key] === undefined) {
                        delete updates[key];
                    }
                });
                if (Object.keys(updates).length === 0) {
                    res.status(400).json({
                        success: false,
                        message: 'No valid update fields provided'
                    });
                    return;
                }
                const updatedProfile = await this.hex.updateContractorProfile.execute(req.user.id, updates);
                let completenessMeta = undefined;
                try {
                    const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                    completenessMeta = refreshed?.meta;
                }
                catch { }
                res.json({
                    success: true,
                    message: 'Contractor profile updated successfully',
                    data: { profile: updatedProfile, meta: completenessMeta }
                });
            }
            catch (error) {
                logger_1.logger.error('Error updating contractor profile:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error updating contractor profile',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get user contacts
        this.getContacts = async (req, res) => {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }
            const contacts = await this.hex.listContacts.execute(req.user.id);
            res.json({ success: true, message: 'Contacts retrieved successfully', data: contacts });
        };
        // Create contact
        this.createContact = async (req, res) => {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }
            const { type, value, isPrimary } = req.body;
            const contact = await this.hex.createContact.execute(req.user.id, { type, value, isPrimary });
            let completenessMeta = undefined;
            try {
                const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                completenessMeta = refreshed?.meta;
            }
            catch { }
            res.status(201).json({ success: true, message: 'Contact created successfully', data: { contact, meta: completenessMeta } });
        };
        // Update contact
        this.updateContact = async (req, res) => {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }
            const { contactId } = req.params;
            const { type, value, isPrimary } = req.body;
            const updates = {};
            if (type !== undefined)
                updates.type = type;
            if (value !== undefined)
                updates.value = value;
            if (isPrimary !== undefined)
                updates.isPrimary = isPrimary;
            const updatedContact = await this.hex.updateContact.execute(contactId, req.user.id, updates);
            let completenessMeta = undefined;
            try {
                const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                completenessMeta = refreshed?.meta;
            }
            catch { }
            res.json({ success: true, message: 'Contact updated successfully', data: { contact: updatedContact, meta: completenessMeta } });
        };
        // Delete contact
        this.deleteContact = async (req, res) => {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }
            const { contactId } = req.params;
            await this.hex.deleteContact.execute(contactId, req.user.id);
            let completenessMeta = undefined;
            try {
                const refreshed = await this.hex.getCompleteProfile.execute(req.user.id);
                completenessMeta = refreshed?.meta;
            }
            catch { }
            res.json({ success: true, message: 'Contact deleted successfully', data: { meta: completenessMeta } });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map