import { Router } from 'express';
import passport from '../config/passport';
import { PgCredentialRepository } from '../hexagon/infrastructure/adapters/PgCredentialRepository';
import { JwtTokenSigner } from '../hexagon/infrastructure/adapters/JwtTokenSigner';
import { pool } from '../infrastructure/db';
import { v4 as uuid } from 'uuid';
import { OAuthUser } from '../config/passport';

// Temporary storage for mobile OAuth (in-memory, expires after 5 minutes)
const mobileOAuthSessions = new Map<string, { accessToken: string; refreshToken: string; userId: string; expiresAt: number }>();

// Clean up expired sessions every minute
setInterval(() => {
    const now = Date.now();
    for (const [sessionId, session] of mobileOAuthSessions.entries()) {
        if (now > session.expiresAt) {
            mobileOAuthSessions.delete(sessionId);
            console.log('[OAuth] Cleaned up expired session:', sessionId);
        }
    }
}, 60000);

export function createOAuthRoutes() {
    const router = Router();
    const credRepo = new PgCredentialRepository(pool);
    const tokenSigner = new JwtTokenSigner();

    // Polling endpoint for mobile OAuth
    router.get('/oauth/poll/:sessionId', (req, res) => {
        const { sessionId } = req.params;
        const session = mobileOAuthSessions.get(sessionId);

        if (session && Date.now() < session.expiresAt) {
            // Return tokens and delete session (one-time use)
            mobileOAuthSessions.delete(sessionId);
            console.log('[OAuth Poll] Session found, returning tokens for:', sessionId);
            res.json({
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
                userId: session.userId
            });
        } else {
            // Not ready yet or expired
            res.status(404).json({ error: 'Session not found or expired' });
        }
    });

    // Google OAuth
    router.get('/google', (req, res, next) => {
        const platform = req.query.platform as string;
        const sessionId = req.query.sessionId as string;

        // Pass platform and sessionId via state parameter
        const state = Buffer.from(JSON.stringify({ platform, sessionId })).toString('base64');

        passport.authenticate('google', {
            scope: ['profile', 'email'],
            session: false,
            state: state
        })(req, res, next);
    });

    router.get('/google/callback',
        passport.authenticate('google', { session: false, failureRedirect: '/login?error=google_auth_failed' }),
        async (req, res) => {
            try {
                const oauthUser = req.user as OAuthUser;
                let platform = 'web';
                let sessionId: string | undefined;

                try {
                    const stateParam = req.query.state as string;
                    if (stateParam) {
                        const decoded = JSON.parse(Buffer.from(stateParam, 'base64').toString());
                        platform = decoded.platform || 'web';
                        sessionId = decoded.sessionId;
                    }
                } catch (e) {
                    console.log('[OAuth] Could not decode state, defaulting to web');
                }

                await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner, platform, sessionId);
            } catch (error) {
                console.error('Google OAuth callback error:', error);
                res.redirect('/login?error=authentication_failed');
            }
        }
    );

    // Facebook OAuth
    router.get('/facebook', (req, res, next) => {
        const platform = req.query.platform as string;
        const sessionId = req.query.sessionId as string;
        const state = Buffer.from(JSON.stringify({ platform, sessionId })).toString('base64');

        passport.authenticate('facebook', {
            scope: ['email', 'public_profile'],
            session: false,
            state: state
        })(req, res, next);
    });

    router.get('/facebook/callback',
        passport.authenticate('facebook', { session: false, failureRedirect: '/login?error=facebook_auth_failed' }),
        async (req, res) => {
            try {
                const oauthUser = req.user as OAuthUser;
                let platform = 'web';
                let sessionId: string | undefined;

                try {
                    const stateParam = req.query.state as string;
                    if (stateParam) {
                        const decoded = JSON.parse(Buffer.from(stateParam, 'base64').toString());
                        platform = decoded.platform || 'web';
                        sessionId = decoded.sessionId;
                    }
                } catch (e) {
                    console.log('[OAuth] Could not decode state, defaulting to web');
                }

                await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner, platform, sessionId);
            } catch (error) {
                console.error('Facebook OAuth callback error:', error);
                res.redirect('/login?error=authentication_failed');
            }
        }
    );

    // Twitter OAuth
    router.get('/twitter', (req, res, next) => {
        const platform = req.query.platform as string;
        const sessionId = req.query.sessionId as string;
        const state = Buffer.from(JSON.stringify({ platform, sessionId })).toString('base64');

        passport.authenticate('twitter', {
            session: false,
            state: state
        })(req, res, next);
    });

    router.get('/twitter/callback',
        passport.authenticate('twitter', { session: false, failureRedirect: '/login?error=twitter_auth_failed' }),
        async (req, res) => {
            try {
                const oauthUser = req.user as OAuthUser;
                let platform = 'web';
                let sessionId: string | undefined;

                try {
                    const stateParam = req.query.state as string;
                    if (stateParam) {
                        const decoded = JSON.parse(Buffer.from(stateParam, 'base64').toString());
                        platform = decoded.platform || 'web';
                        sessionId = decoded.sessionId;
                    }
                } catch (e) {
                    console.log('[OAuth] Could not decode state, defaulting to web');
                }

                await handleOAuthCallback(oauthUser, res, credRepo, tokenSigner, platform, sessionId);
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
    tokenSigner: JwtTokenSigner,
    platform?: string,
    sessionId?: string
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

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        // For mobile: Store tokens in session store for polling
        if (platform === 'mobile' && sessionId) {
            mobileOAuthSessions.set(sessionId, {
                accessToken,
                refreshToken,
                userId: user.id,
                expiresAt: Date.now() + (5 * 60 * 1000) // 5 minutes
            });
            console.log('[OAuth] Mobile platform - stored session:', sessionId);

            // Redirect to a success page that tells user to return to app
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Authentication Successful</title>
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                            margin: 0;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            padding: 20px;
                        }
                        .container {
                            background: white;
                            padding: 40px;
                            border-radius: 12px;
                            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                            text-align: center;
                            max-width: 400px;
                        }
                        .success-icon {
                            width: 80px;
                            height: 80px;
                            margin: 0 auto 20px;
                            background: #4CAF50;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .checkmark {
                            width: 40px;
                            height: 40px;
                            border: 4px solid white;
                            border-radius: 50%;
                            border-left-color: transparent;
                            border-top-color: transparent;
                            transform: rotate(45deg);
                        }
                        h1 {
                            color: #333;
                            margin: 0 0 10px;
                            font-size: 24px;
                        }
                        p {
                            color: #666;
                            margin: 0 0 20px;
                            font-size: 16px;
                            line-height: 1.5;
                        }
                        .close-btn {
                            background: #667eea;
                            color: white;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 6px;
                            font-size: 16px;
                            cursor: pointer;
                            font-weight: 600;
                        }
                        .close-btn:hover {
                            background: #5568d3;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="success-icon">
                            <div class="checkmark"></div>
                        </div>
                        <h1>Authentication Successful!</h1>
                        <p>You can now close this window and return to the ComeOnDost app.</p>
                        <button class="close-btn" onclick="window.close()">Close Window</button>
                    </div>
                    <script>
                        // Auto-close after 2 seconds
                        setTimeout(() => {
                            window.close();
                        }, 2000);
                    </script>
                </body>
                </html>
            `);
            return;
        }

        // For web: use HTTPS redirect
        const redirectUrl = `${frontendUrl}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}&user_id=${user.id}`;
        console.log('[OAuth] Web platform - redirecting to:', redirectUrl);
        res.redirect(redirectUrl);
    } catch (error: any) {
        console.error('OAuth callback handling error:', error);

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/login?error=${error.message || 'oauth_failed'}`);
    }
}
