export interface UserProps {
    id: string;
    username: string;
    role: 'worker' | 'contractor';
    name?: string | null;
    location?: string | null;
    phone?: string | null;
    createdAt: Date;
}
export declare class UserEntity {
    private readonly props;
    constructor(props: UserProps);
    get id(): string;
    get username(): string;
    get role(): "worker" | "contractor";
    get name(): string | null;
    get location(): string | null;
    get phone(): string | null;
    get createdAt(): Date;
    hasBaseProfile(): boolean;
    toPrimitives(): {
        id: string;
        username: string;
        role: "worker" | "contractor";
        name?: string | null;
        location?: string | null;
        phone?: string | null;
        createdAt: Date;
    };
}
