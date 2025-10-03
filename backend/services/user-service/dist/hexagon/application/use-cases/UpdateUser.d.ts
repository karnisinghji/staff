import { UserRepositoryPort, UpdateUserFields } from '../ports/UserRepository';
export declare class UpdateUserUseCase {
    private users;
    constructor(users: UserRepositoryPort);
    execute(userId: string, fields: UpdateUserFields): Promise<{
        id: string;
        username: string;
        role: "worker" | "contractor";
        name?: string | null;
        email?: string | null;
        location?: string | null;
        address?: string | null;
        phone?: string | null;
        profileCompletedAt?: string | null;
        profileLockedAt?: string | null;
        createdAt: Date;
    }>;
}
