import { Router } from 'express';
import passport from '../config/passport';
import { PgCredentialRepository } from '../hexagon/infrastructure/adapters/PgCredentialRepository';
import { JwtTokenSigner } from '../hexagon/infrastructure/adapters/JwtTokenSigner';
import { pool } from '../infrastructure/db';
import { v4 as uuid } from 'uuid';
import { OAuthUser } from '../config/passport';

export function createOAuthRoutes() {
    const router = Router();
    const credRepo = new PgCredentialRepository(pool);
    const tokenSigner = new JwtTokenSigner();

    // Google OAuth
    router.get('/google', (req, res, next) => {
        // Store platform query param in session/cookie for callback
        if (req.query.platform === 'mobile') {
            res.cookie('oauth_platform', 'mobile', { httpOnly: true, maxAge: 600000 }); // 10 min
        }
        passport.authenticate('google', {
            scope: ['profile', 'email'],
            session: false
        })(req, res, next);
    });

    router.get('/google/callback',
        passport.authenticate('google', { session: false, failureRedirect: '/login?error=google_auth_failed' }),
        async (req, res) => {
            try {
                const oauthUser = req.user as OAuthUser;
                await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner);
            } catch (error) {
                console.error('Google OAuth callback error:', error);
                res.redirect('/login?error=authentication_failed');
            }
        }
    );

    // Facebook OAuth
    router.get('/facebook', passport.authenticate('facebook', {
        scope: ['email', 'public_profile'],
        session: false
    }));

    router.get('/facebook/callback',
        passport.authenticate('facebook', { session: false, failureRedirect: '/login?error=facebook_auth_failed' }),
        async (req, res) => {
            try {
                const oauthUser = req.user as OAuthUser;
                await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner);
            } catch (error) {
                console.error('Facebook OAuth callback error:', error);
                res.redirect('/login?error=authentication_failed');
            }
        }
    );

    // Twitter (X) OAuth
    router.get('/twitter', passport.authenticate('twitter', {
        session: false
    }));

    router.get('/twitter/callback',
        passport.authenticate('twitter', { session: false, failureRedirect: '/login?error=twitter_auth_failed' }),
        async (req, res) => {
            try {
                const oauthUser = req.user as OAuthUser;
                await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner);
            } catch (error) {
                console.error('Twitter OAuth callback error:', error);
                res.redirect('/login?error=authentication_failed');
            }
        }
    );

    return router;
}

async function handleOAuthCallback(
    oauthUser: OAuthUser,
    res: any,
    credRepo: PgCredentialRepository,
    tokenSigner: JwtTokenSigner
) {
    try {
        // Check if user already exists with this OAuth provider
        let user = await credRepo.findByOAuth(oauthUser.oauthProvider, oauthUser.oauthId);

        if (!user) {
            // Create new user
            user = await credRepo.createOAuthUser({
                id: uuid(),
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

        // Check if this is a mobile app OAuth flow (from cookie set in initial request)
        const isMobileApp = res.req?.cookies?.oauth_platform === 'mobile';

        // Clear the platform cookie
        res.clearCookie('oauth_platform');

        // Use mobile deep-link for app, web URL for browser
        let redirectUrl: string;
        if (isMobileApp) {
            // Mobile deep-link
            redirectUrl = `com.comeondost.app://auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}&user_id=${user.id}`;
        } else {
            // Web redirect
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            redirectUrl = `${frontendUrl}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}&user_id=${user.id}`;
        }

        res.redirect(redirectUrl);
    } catch (error: any) {
        console.error('OAuth callback handling error:', error);

        // Check mobile platform from cookie
        const isMobileApp = res.req?.cookies?.oauth_platform === 'mobile';
        res.clearCookie('oauth_platform');

        if (isMobileApp) {
            res.redirect(`com.comeondost.app://login?error=${error.message || 'oauth_failed'}`);
        } else {
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            res.redirect(`${frontendUrl}/login?error=${error.message || 'oauth_failed'}`);
        }
    }
}
