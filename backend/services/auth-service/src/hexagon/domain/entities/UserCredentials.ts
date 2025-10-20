export interface UserCredentials {
    id: string;
    email: string;
    passwordHash: string;
    roles: string[];
    createdAt: Date;
    oauthProvider?: string;  // OAuth provider (google, facebook, twitter)
    oauthId?: string;         // OAuth provider user ID
}
