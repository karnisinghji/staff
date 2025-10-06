import { Request } from 'express';

declare global {
    namespace Express {
        interface User {
            id: string;
            // add other user properties as needed
        }
    }
}

export {};