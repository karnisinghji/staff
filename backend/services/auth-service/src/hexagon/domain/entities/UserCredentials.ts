export interface UserCredentials {
    id: string;
    email: string;
    passwordHash: string;
    roles: string[];
    createdAt: Date;
}
