import { Request, Response } from 'express';
import { AuthUser } from '../types';
interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare class MatchingController {
    private hex;
    constructor();
    findWorkers: (req: AuthRequest, res: Response) => Promise<void>;
    findContractors: (req: AuthRequest, res: Response) => Promise<void>;
    getMatchPreferences: (req: AuthRequest, res: Response) => Promise<void>;
    updateMatchPreferences: (req: AuthRequest, res: Response) => Promise<void>;
    saveMatch: (req: AuthRequest, res: Response) => Promise<void>;
    getSavedMatches: (req: AuthRequest, res: Response) => Promise<void>;
    deleteSavedMatch: (req: AuthRequest, res: Response) => Promise<void>;
    getMatchingStats: (req: AuthRequest, res: Response) => Promise<void>;
}
export {};
