export interface UserProps {
    id: string;
    username: string;
    role: 'worker' | 'contractor';
    name?: string | null;
    location?: string | null;
    phone?: string | null;
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
    get location() { return this.props.location ?? null; }
    get phone() { return this.props.phone ?? null; }
    get createdAt() { return this.props.createdAt; }
    hasBaseProfile(): boolean { return !!this.name && !!this.location; }
    toPrimitives() {
        return { ...this.props };
    }
}
