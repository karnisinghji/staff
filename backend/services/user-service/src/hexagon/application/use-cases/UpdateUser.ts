import { UserRepositoryPort, UpdateUserFields } from '../ports/UserRepository';

export class UpdateUserUseCase {
    constructor(private users: UserRepositoryPort) { }
    async execute(userId: string, fields: UpdateUserFields) {
        if (!Object.keys(fields).length) throw new Error('No valid update fields provided');
        const updated = await this.users.updateUser(userId, fields);
        return updated.toPrimitives();
    }
}
