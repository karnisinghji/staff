import dotenv from 'dotenv';
// Load environment variables before configuring passport
dotenv.config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';

export interface OAuthProfile {
    provider: 'google' | 'facebook' | 'twitter';
    id: string;
    displayName?: string;
    name?: {
        familyName?: string;
        givenName?: string;
    };
    emails?: Array<{ value: string; verified?: boolean }>;
    photos?: Array<{ value: string }>;
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

// Passport serialization (for session management)
passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

// Google OAuth Strategy
console.log('🔐 Configuring OAuth strategies...');
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    console.log('✅ Registering Google OAuth strategy');
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        const oauthUser: OAuthUser = {
            oauthProvider: 'google',
            oauthId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            username: profile.emails?.[0]?.value,
            profileData: {
                displayName: profile.displayName,
                photo: profile.photos?.[0]?.value,
                emails: profile.emails
            }
        };
        done(null, oauthUser);
    }));
}

// Facebook OAuth Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3001/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email', 'photos', 'name']
    }, (accessToken, refreshToken, profile, done) => {
        const oauthUser: OAuthUser = {
            oauthProvider: 'facebook',
            oauthId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            username: profile.emails?.[0]?.value || `facebook_${profile.id}`,
            profileData: {
                displayName: profile.displayName,
                photo: profile.photos?.[0]?.value,
                emails: profile.emails
            }
        };
        done(null, oauthUser);
    }));
}

// Twitter (X) OAuth Strategy
if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3001/api/auth/twitter/callback',
        includeEmail: true
    }, (token, tokenSecret, profile, done) => {
        const oauthUser: OAuthUser = {
            oauthProvider: 'twitter',
            oauthId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            username: profile.username || `twitter_${profile.id}`,
            profileData: {
                displayName: profile.displayName,
                username: profile.username,
                photo: profile.photos?.[0]?.value,
                emails: profile.emails
            }
        };
        done(null, oauthUser);
    }));
}

export default passport;
