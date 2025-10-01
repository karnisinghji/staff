"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOAuthRoutes = createOAuthRoutes;
const express_1 = require("express");
const passport_1 = __importDefault(require("../config/passport"));
const PgCredentialRepository_1 = require("../hexagon/infrastructure/adapters/PgCredentialRepository");
const JwtTokenSigner_1 = require("../hexagon/infrastructure/adapters/JwtTokenSigner");
const db_1 = require("../infrastructure/db");
const uuid_1 = require("uuid");
function createOAuthRoutes() {
    const router = (0, express_1.Router)();
    const credRepo = new PgCredentialRepository_1.PgCredentialRepository(db_1.pool);
    const tokenSigner = new JwtTokenSigner_1.JwtTokenSigner();
    // Google OAuth
    router.get('/google', passport_1.default.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    }));
    router.get('/google/callback', passport_1.default.authenticate('google', { session: false, failureRedirect: '/login?error=google_auth_failed' }), async (req, res) => {
        try {
            const oauthUser = req.user;
            await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner);
        }
        catch (error) {
            console.error('Google OAuth callback error:', error);
            res.redirect('/login?error=authentication_failed');
        }
    });
    // Facebook OAuth
    router.get('/facebook', passport_1.default.authenticate('facebook', {
        scope: ['email', 'public_profile'],
        session: false
    }));
    router.get('/facebook/callback', passport_1.default.authenticate('facebook', { session: false, failureRedirect: '/login?error=facebook_auth_failed' }), async (req, res) => {
        try {
            const oauthUser = req.user;
            await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner);
        }
        catch (error) {
            console.error('Facebook OAuth callback error:', error);
            res.redirect('/login?error=authentication_failed');
        }
    });
    // Twitter (X) OAuth
    router.get('/twitter', passport_1.default.authenticate('twitter', {
        session: false
    }));
    router.get('/twitter/callback', passport_1.default.authenticate('twitter', { session: false, failureRedirect: '/login?error=twitter_auth_failed' }), async (req, res) => {
        try {
            const oauthUser = req.user;
            await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner);
        }
        catch (error) {
            console.error('Twitter OAuth callback error:', error);
            res.redirect('/login?error=authentication_failed');
        }
    });
    return router;
}
async function handleOAuthCallback(oauthUser, res, credRepo, tokenSigner) {
    try {
        // Check if user already exists with this OAuth provider
        let user = await credRepo.findByOAuth(oauthUser.oauthProvider, oauthUser.oauthId);
        if (!user) {
            // Create new user
            user = await credRepo.createOAuthUser({
                id: (0, uuid_1.v4)(),
                oauthProvider: oauthUser.oauthProvider,
                oauthId: oauthUser.oauthId,
                email: oauthUser.email,
                name: oauthUser.name,
                username: oauthUser.username,
                profileData: oauthUser.profileData
            });
        }
        // Generate JWT tokens
        const accessToken = tokenSigner.signAccessToken({ sub: user.id, roles: user.roles }, '15m');
        const refreshToken = tokenSigner.signRefreshToken({ sub: user.id }, '7d');
        // Redirect to frontend with tokens
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const redirectUrl = `${frontendUrl}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}&user_id=${user.id}`;
        res.redirect(redirectUrl);
    }
    catch (error) {
        console.error('OAuth callback handling error:', error);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/login?error=${error.message || 'oauth_failed'}`);
    }
}
//# sourceMappingURL=oauthRoutes.js.map