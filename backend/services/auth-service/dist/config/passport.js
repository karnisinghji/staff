"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables before configuring passport
dotenv_1.default.config();
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const passport_twitter_1 = require("passport-twitter");
// Passport serialization (for session management)
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// Google OAuth Strategy
console.log('🔐 Configuring OAuth strategies...');
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    console.log('✅ Registering Google OAuth strategy');
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        const oauthUser = {
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
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3001/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email', 'photos', 'name']
    }, (accessToken, refreshToken, profile, done) => {
        const oauthUser = {
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
    passport_1.default.use(new passport_twitter_1.Strategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3001/api/auth/twitter/callback',
        includeEmail: true
    }, (token, tokenSecret, profile, done) => {
        const oauthUser = {
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
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map