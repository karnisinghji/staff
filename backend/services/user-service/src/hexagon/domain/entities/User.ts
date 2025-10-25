export interface UserProps {
    id: string;
    username: string;
    role: 'worker' | 'contractor';
    name?: string | null;
    email?: string | null;
    location?: string | null;
    address?: string | null;
    phone?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    profileCompletedAt?: string | null;
    profileLockedAt?: string | null;
    createdAt: Date;
}

export class UserEntity {
    private readonly props: UserProps;
    constructor(props: UserProps) {
        this.props = Object.freeze({ ...props });
    }
    get id() { return this.props.id; }
    get username() { return this.props.username; }
    get role() { return this.props.role; }
    get name() { return this.props.name ?? null; }
    get email() { return this.props.email ?? null; }
    get location() { return this.props.location ?? null; }
    get address() { return this.props.address ?? null; }
    get phone() { return this.props.phone ?? null; }
    get latitude() { return this.props.latitude ?? null; }
    get longitude() { return this.props.longitude ?? null; }
    get profileCompletedAt() { return this.props.profileCompletedAt ?? null; }
    get profileLockedAt() { return this.props.profileLockedAt ?? null; }
    get createdAt() { return this.props.createdAt; }
    hasBaseProfile(): boolean { return !!this.name && !!this.location; }
    toPrimitives() {
        return { ...this.props };
    }
}
