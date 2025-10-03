import { Request, Response } from 'express';
export declare class ContractorRequirementController {
    createRequirement(req: Request, res: Response): Promise<void>;
    listRequirements(req: Request, res: Response): Promise<void>;
}
