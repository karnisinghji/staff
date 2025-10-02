import { UserEntity } from '../../domain/entities/User';

export interface UpdateUserFields {
    name?: string;
    phone?: string;
    location?: string;
    email?: string;
    address?: string;
    profileCompletedAt?: string;
    profileLockedAt?: string;
}

export interface UserRepositoryPort {
    findById(id: string): Promise<UserEntity | null>;
    updateUser(id: string, fields: UpdateUserFields): Promise<UserEntity>;
}
