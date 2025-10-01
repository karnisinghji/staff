import { Request, Response } from 'express';
import { AuthUser } from '../types';
interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare class UserController {
    private hex;
    constructor();
    getSkills: (_req: Request, res: Response) => Promise<void>;
    forgotPassword: (req: Request, res: Response) => Promise<void>;
    getCurrentUser: (req: AuthRequest, res: Response) => Promise<void>;
    getUserById: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: AuthRequest, res: Response) => Promise<void>;
    updateWorkerProfile: (req: AuthRequest, res: Response) => Promise<void>;
    updateContractorProfile: (req: AuthRequest, res: Response) => Promise<void>;
    getContacts: (req: AuthRequest, res: Response) => Promise<void>;
    createContact: (req: AuthRequest, res: Response) => Promise<void>;
    updateContact: (req: AuthRequest, res: Response) => Promise<void>;
    deleteContact: (req: AuthRequest, res: Response) => Promise<void>;
}
export {};
