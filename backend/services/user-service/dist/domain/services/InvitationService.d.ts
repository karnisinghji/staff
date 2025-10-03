import { Pool } from 'pg';
export interface Invitation {
    id: string;
    inviterId: string;
    invitationCode: string;
    invitationType: 'general' | 'worker' | 'contractor';
    recipientName?: string;
    recipientEmail?: string;
    recipientPhone?: string;
    status: 'sent' | 'clicked' | 'registered' | 'expired';
    clicksCount: number;
    registeredUserId?: string;
    registeredAt?: Date;
    expiresAt: Date;
    createdAt: Date;
    customMessage?: string;
}
export interface CreateInvitationRequest {
    invitationType?: 'general' | 'worker' | 'contractor';
    recipientName?: string;
    recipientEmail?: string;
    recipientPhone?: string;
    customMessage?: string;
    expiresInDays?: number;
}
export interface InvitationStats {
    totalSent: number;
    totalClicked: number;
    totalRegistered: number;
    clickRate: number;
    conversionRate: number;
}
export declare class InvitationService {
    private pool;
    constructor(pool: Pool);
    private generateInvitationCode;
    createInvitation(inviterId: string, request: CreateInvitationRequest): Promise<Invitation>;
    getInvitationByCode(code: string): Promise<Invitation | null>;
    trackInvitationClick(code: string, ipAddress?: string, userAgent?: string, referrer?: string): Promise<void>;
    markAsRegistered(code: string, userId: string): Promise<void>;
    getUserInvitations(userId: string, limit?: number, offset?: number): Promise<Invitation[]>;
    getUserInvitationStats(userId: string): Promise<InvitationStats>;
    generateInvitationLink(code: string, baseUrl?: string): string;
    private mapRowToInvitation;
}
