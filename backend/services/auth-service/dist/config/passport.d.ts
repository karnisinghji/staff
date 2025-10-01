import passport from 'passport';
export interface OAuthProfile {
    provider: 'google' | 'facebook' | 'twitter';
    id: string;
    displayName?: string;
    name?: {
        familyName?: string;
        givenName?: string;
    };
    emails?: Array<{
        value: string;
        verified?: boolean;
    }>;
    photos?: Array<{
        value: string;
    }>;
    username?: string;
    profileUrl?: string;
}
export interface OAuthUser {
    oauthProvider: string;
    oauthId: string;
    email?: string;
    name?: string;
    username?: string;
    profileData: any;
}
export default passport;
