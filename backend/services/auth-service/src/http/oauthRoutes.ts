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
        
        // For mobile with sessionId: store tokens for polling
        if (platform === 'mobile' && sessionId) {
            console.log('[OAuth] Mobile platform - storing tokens for session:', sessionId);
            
            mobileOAuthSessions.set(sessionId, {
                accessToken,
                refreshToken,
                userId: user.id,
                expiresAt: Date.now() + (5 * 60 * 1000) // Expires in 5 minutes
            });
            
            // Show success page
            res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Successful</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .icon {
            font-size: 64px;
            margin-bottom: 20px;
            animation: bounce 1s ease;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
        }
        p {
            margin: 0 0 20px 0;
            opacity: 0.9;
        }
        .spinner {
            width: 40px;
            height: 40px;
            margin: 20px auto;
            border: 4px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">✅</div>
        <h1>Login Successful!</h1>
        <p>Returning to app...</p>
        <div class="spinner"></div>
    </div>
    
    <script>
        // Auto-close after 3 seconds
        setTimeout(() => {
            window.close();
        }, 3000);
    </script>
</body>
</html>
            `);
        } else {
            // For web: use HTTPS redirect
            const redirectUrl = `${frontendUrl}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}&user_id=${user.id}`;
            console.log('[OAuth] Web platform - redirecting to:', redirectUrl);
            res.redirect(redirectUrl);
        }
    } catch (error: any) {
        console.error('OAuth callback handling error:', error);

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/login?error=${error.message || 'oauth_failed'}`);
    }
}
