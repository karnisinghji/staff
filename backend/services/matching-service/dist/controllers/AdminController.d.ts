import { Request, Response } from 'express';
export declare class AdminController {
    private hex;
    getDefaultWeights: (_req: Request, res: Response) => Promise<void>;
    updateDefaultWeights: (req: Request, res: Response) => Promise<void>;
    invalidateCache: (_req: Request, res: Response) => Promise<void>;
}
export declare const adminController: AdminController;
