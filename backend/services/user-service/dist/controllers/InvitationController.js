"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationController = void 0;
const zod_1 = require("zod");
// Validation schemas
const createInvitationSchema = zod_1.z.object({
    invitationType: zod_1.z.enum(['general', 'worker', 'contractor']).optional(),
    recipientName: zod_1.z.string().min(1).max(100).optional(),
    recipientEmail: zod_1.z.string().email().optional(),
    recipientPhone: zod_1.z.string().regex(/^\+91[6-9]\d{9}$/).optional(),
    customMessage: zod_1.z.string().max(500).optional(),
    expiresInDays: zod_1.z.number().min(1).max(365).optional()
});
class InvitationController {
    constructor(invitationService) {
        this.invitationService = invitationService;
    }
    // POST /api/invitations - Create new invitation
    async createInvitation(req, res) {
        try {
            console.log('[InvitationController] createInvitation called');
            console.log('[InvitationController] req.user:', req.user);
            console.log('[InvitationController] req.body:', req.body);
            const userId = req.user?.id;
            if (!userId) {
                console.log('[InvitationController] No userId found, returning 401');
                return res.status(401).json({ error: 'Unauthorized' });
            }
            console.log('[InvitationController] Validating request data...');
            const validatedData = createInvitationSchema.parse(req.body);
            console.log('[InvitationController] Validation successful, creating invitation...');
            const invitation = await this.invitationService.createInvitation(userId, validatedData);
            console.log('[InvitationController] Invitation created:', invitation);
            // Generate the invitation link
            const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            console.log('[InvitationController] Base URL:', baseUrl);
            const invitationLink = this.invitationService.generateInvitationLink(invitation.invitationCode, baseUrl);
            console.log('[InvitationController] Invitation link generated:', invitationLink);
            return res.status(201).json({
                success: true,
                data: {
                    invitation: {
                        id: invitation.id,
                        code: invitation.invitationCode,
                        type: invitation.invitationType,
                        expiresAt: invitation.expiresAt,
                        createdAt: invitation.createdAt
                    },
                    invitationLink,
                    shareLinks: {
                        whatsapp: `https://wa.me/?text=${encodeURIComponent(`Join our platform! ${invitationLink}${invitation.customMessage ? ' - ' + invitation.customMessage : ''}`)}`,
                        email: `mailto:?subject=${encodeURIComponent('Join Our Platform')}&body=${encodeURIComponent(`You're invited to join our platform!\n\nClick here to register: ${invitationLink}${invitation.customMessage ? '\n\nMessage: ' + invitation.customMessage : ''}`)}`,
                        sms: `sms:?body=${encodeURIComponent(`Join our platform: ${invitationLink}${invitation.customMessage ? ' - ' + invitation.customMessage : ''}`)}`
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                console.log('[InvitationController] Validation error:', error.errors);
                return res.status(400).json({
                    error: 'Validation failed',
                    details: error.errors
                });
            }
            console.error('[InvitationController] Error creating invitation:', error);
            console.error('[InvitationController] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    ;
    // GET /api/invitations - Get user's invitations
    async getUserInvitations(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const page = parseInt(req.query.page) || 1;
            const limit = Math.min(parseInt(req.query.limit) || 10, 50);
            const offset = (page - 1) * limit;
            const invitations = await this.invitationService.getUserInvitations(userId, limit, offset);
            const stats = await this.invitationService.getUserInvitationStats(userId);
            return res.json({
                success: true,
                data: {
                    invitations: invitations.map(inv => ({
                        id: inv.id,
                        code: inv.invitationCode,
                        type: inv.invitationType,
                        recipientName: inv.recipientName,
                        recipientEmail: inv.recipientEmail,
                        status: inv.status,
                        clicksCount: inv.clicksCount,
                        createdAt: inv.createdAt,
                        expiresAt: inv.expiresAt,
                        registeredAt: inv.registeredAt
                    })),
                    stats,
                    pagination: {
                        page,
                        limit,
                        hasMore: invitations.length === limit
                    }
                }
            });
        }
        catch (error) {
            console.error('Error fetching invitations:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    ;
    // GET /api/invitations/stats - Get invitation statistics
    async getInvitationStats(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const stats = await this.invitationService.getUserInvitationStats(userId);
            return res.json({
                success: true,
                data: stats
            });
        }
        catch (error) {
            console.error('Error fetching invitation stats:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    ;
    // GET /api/invitations/:code/validate - Validate invitation code
    async validateInvitation(req, res) {
        try {
            const { code } = req.params;
            if (!code || code.length !== 32) {
                return res.status(400).json({ error: 'Invalid invitation code' });
            }
            const invitation = await this.invitationService.getInvitationByCode(code);
            if (!invitation) {
                return res.status(404).json({
                    error: 'Invitation not found or expired',
                    valid: false
                });
            }
            // Track the click
            const ipAddress = req.ip;
            const userAgent = req.get('User-Agent');
            const referrer = req.get('Referer');
            await this.invitationService.trackInvitationClick(code, ipAddress, userAgent, referrer);
            return res.json({
                success: true,
                data: {
                    valid: true,
                    invitation: {
                        type: invitation.invitationType,
                        inviterName: invitation.recipientName, // This could be enhanced to fetch inviter details
                        customMessage: invitation.customMessage,
                        expiresAt: invitation.expiresAt
                    }
                }
            });
        }
        catch (error) {
            console.error('Error validating invitation:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    ;
    // POST /api/invitations/:code/register - Mark invitation as registered
    async markAsRegistered(req, res) {
        try {
            const { code } = req.params;
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            if (!code || code.length !== 32) {
                return res.status(400).json({ error: 'Invalid invitation code' });
            }
            await this.invitationService.markAsRegistered(code, userId);
            return res.json({
                success: true,
                message: 'Invitation marked as registered'
            });
        }
        catch (error) {
            console.error('Error marking invitation as registered:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    ;
}
exports.InvitationController = InvitationController;
//# sourceMappingURL=InvitationController.js.map