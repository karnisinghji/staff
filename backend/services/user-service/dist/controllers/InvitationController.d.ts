import { Request, Response } from 'express';
import { InvitationService } from '../domain/services/InvitationService';
export declare class InvitationController {
    private invitationService;
    constructor(invitationService: InvitationService);
    createInvitation(req: Request, res: Response): Promise<Response>;
    getUserInvitations(req: Request, res: Response): Promise<Response>;
    getInvitationStats(req: Request, res: Response): Promise<Response>;
    validateInvitation(req: Request, res: Response): Promise<Response>;
    markAsRegistered(req: Request, res: Response): Promise<Response>;
}
