export interface UserProps {
    id: string;
    username: string;
    role: 'worker' | 'contractor';
    name?: string | null;
    email?: string | null;
    location?: string | null;
    address?: string | null;
    phone?: string | null;
    profileCompletedAt?: string | null;
    profileLockedAt?: string | null;
    createdAt: Date;
}
export declare class UserEntity {
    private readonly props;
    constructor(props: UserProps);
    get id(): string;
    get username(): string;
    get role(): "worker" | "contractor";
    get name(): string | null;
    get email(): string | null;
    get location(): string | null;
    get address(): string | null;
    get phone(): string | null;
    get profileCompletedAt(): string | null;
    get profileLockedAt(): string | null;
    get createdAt(): Date;
    hasBaseProfile(): boolean;
    toPrimitives(): {
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
    };
}
