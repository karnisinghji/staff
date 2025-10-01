import { UserRepositoryPort, UpdateUserFields } from '../ports/UserRepository';
export declare class UpdateUserUseCase {
    private users;
    constructor(users: UserRepositoryPort);
    execute(userId: string, fields: UpdateUserFields): Promise<{
        id: string;
        username: string;
        role: "worker" | "contractor";
        name?: string | null;
        location?: string | null;
        phone?: string | null;
        createdAt: Date;
    }>;
}
