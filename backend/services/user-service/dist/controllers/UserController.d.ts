import { Request, Response } from 'express';
export declare class UserController {
    private hex;
    constructor();
    getSkills: (_req: Request, res: Response) => Promise<void>;
    forgotPassword: (req: Request, res: Response) => Promise<void>;
    getCurrentUser: (req: Request, res: Response) => Promise<void>;
    getUserById: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<void>;
    updateWorkerProfile: (req: Request, res: Response) => Promise<void>;
    updateContractorProfile: (req: Request, res: Response) => Promise<void>;
    getContacts: (req: Request, res: Response) => Promise<void>;
    createContact: (req: Request, res: Response) => Promise<void>;
    updateContact: (req: Request, res: Response) => Promise<void>;
    deleteContact: (req: Request, res: Response) => Promise<void>;
}
