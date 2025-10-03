import { Request, Response } from 'express';
export declare class MatchingController {
    private hex;
    constructor();
    findWorkers: (req: Request, res: Response) => Promise<void>;
    findContractors: (req: Request, res: Response) => Promise<void>;
    getMatchPreferences: (req: Request, res: Response) => Promise<void>;
    updateMatchPreferences: (req: Request, res: Response) => Promise<void>;
    saveMatch: (req: Request, res: Response) => Promise<void>;
    getSavedMatches: (req: Request, res: Response) => Promise<void>;
    deleteSavedMatch: (req: Request, res: Response) => Promise<void>;
    getMatchingStats: (req: Request, res: Response) => Promise<void>;
    sendTeamRequest: (req: Request, res: Response) => Promise<void>;
    getReceivedTeamRequests: (req: Request, res: Response) => Promise<void>;
    getSentTeamRequests: (req: Request, res: Response) => Promise<void>;
    updateTeamRequest: (req: Request, res: Response) => Promise<void>;
    getMyTeam: (req: Request, res: Response) => Promise<void>;
    removeTeamMember: (req: Request, res: Response) => Promise<void>;
    blockUser: (req: Request, res: Response) => Promise<void>;
    unblockUser: (req: Request, res: Response) => Promise<void>;
    getBlockedUsers: (req: Request, res: Response) => Promise<void>;
    checkBlockStatus: (req: Request, res: Response) => Promise<void>;
}
