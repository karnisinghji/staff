"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = createAuthRoutes;
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_1 = require("./validation");
const emailService_1 = require("../services/emailService");
const db_1 = require("../infrastructure/db");
function createAuthRoutes(c) {
    const r = (0, express_1.Router)();
    r.get('/health', async (_req, res) => {
        const h = await c.getHealth.execute();
        res.json(h);
    });
    const registerHandler = async (req, res) => {
        try {
            const out = await c.registerUser.execute({ email: req.body.email, password: req.body.password, roles: req.body.roles });
            res.status(201).json(out);
        }
        catch (e) {
            const errorMsg = e.message || '';
            // Handle EMAIL_TAKEN error
            if (errorMsg === 'EMAIL_TAKEN') {
                return res.status(409).json({
                    success: false,
                    error: { code: 'EMAIL_TAKEN', message: 'This email is already registered' },
                    legacyError: 'This email is already registered',
                    fields: { email: 'This email is already registered' }
                });
            }
            // Handle PHONE_TAKEN error
            if (errorMsg === 'PHONE_TAKEN') {
                return res.status(409).json({
                    success: false,
                    error: { code: 'PHONE_TAKEN', message: 'This phone number is already registered' },
                    legacyError: 'This phone number is already registered',
                    fields: { phone: 'This phone number is already registered' }
                });
            }
            // Handle USERNAME_TAKEN (could be email or phone)
            if (errorMsg.startsWith('USERNAME_TAKEN:')) {
                const identifier = errorMsg.split(':')[1] || 'email/phone';
                return res.status(409).json({
                    success: false,
                    error: { code: 'USERNAME_TAKEN', message: `This ${identifier} is already registered` },
                    legacyError: `This ${identifier} is already registered`,
                    fields: { username: `This ${identifier} is already registered` }
                });
            }
            // Handle generic duplicate
            if (errorMsg === 'DUPLICATE_USER') {
                return res.status(409).json({
                    success: false,
                    error: { code: 'DUPLICATE_USER', message: 'This email or phone number is already registered' },
                    legacyError: 'This email or phone number is already registered'
                });
            }
            // Log the actual error for debugging
            console.error('[auth-service] Registration error:', errorMsg);
            res.status(400).json({
                success: false,
                error: { code: 'REGISTRATION_FAILED', message: errorMsg || 'Registration failed' },
                legacyError: errorMsg || 'Registration failed'
            });
        }
    };
    // Canonical route
    r.post('/register', (0, validation_1.validate)(validation_1.registerSchema), registerHandler);
    // Backwards compatibility alias (/signup) with deprecation warning
    r.post('/signup', (0, validation_1.validate)(validation_1.registerSchema), (req, res) => {
        try {
            (req.app?.locals?.logger || console).warn('[deprecation] /api/auth/signup is deprecated; use /api/auth/register');
        }
        catch { /* ignore logger issues */ }
        registerHandler(req, res);
    });
    r.post('/login', (0, validation_1.validate)(validation_1.loginSchema), async (req, res) => {
        try {
            const out = await c.login.execute({ email: req.body.email, password: req.body.password });
            res.json(out);
        }
        catch (e) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
    r.post('/refresh', async (req, res) => {
        try {
            const out = await c.refreshToken.execute({ refreshToken: req.body.refreshToken });
            res.json(out);
        }
        catch (e) {
            res.status(401).json({ error: 'Invalid refresh token' });
        }
    });
    // Forgot password endpoint with full email functionality
    r.post('/forgot-password', async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: 'Email is required'
                });
            }
            // Check if user exists
            const userResult = await db_1.pool.query('SELECT id, email, name FROM users WHERE email = $1', [email.toLowerCase()]);
            // If user exists, generate token and send email
            if (userResult.rows.length > 0) {
                const user = userResult.rows[0];
                // Generate secure random token
                const resetToken = crypto_1.default.randomBytes(32).toString('hex');
                // Set expiry to 1 hour from now
                const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
                // Save token to database
                await db_1.pool.query(`INSERT INTO password_reset_tokens (user_id, token, expires_at, used)
                     VALUES ($1, $2, $3, false)`, [user.id, resetToken, expiresAt]);
                // Construct reset URL (frontend reset password page)
                const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;
                // Send password reset email
                await emailService_1.emailService.sendPasswordResetEmail(user.email, user.name, resetUrl);
                console.log(`[auth-service] Password reset email sent to: ${email}`);
            }
            else {
                console.log(`[auth-service] Password reset requested for non-existent email: ${email}`);
            }
            // Always return success to prevent email enumeration
            res.json({
                success: true,
                message: 'If an account exists for this email, a reset link has been sent.'
            });
        }
        catch (e) {
            console.error('[auth-service] Forgot password error:', e);
            res.status(500).json({
                success: false,
                error: 'Failed to process password reset request'
            });
        }
    });
    // Validate reset token endpoint
    r.get('/validate-reset-token/:token', async (req, res) => {
        try {
            const { token } = req.params;
            const result = await db_1.pool.query(`SELECT id, user_id, expires_at, used 
                 FROM password_reset_tokens 
                 WHERE token = $1`, [token]);
            if (result.rows.length === 0) {
                return res.json({
                    success: true,
                    valid: false,
                    message: 'Invalid reset token'
                });
            }
            const tokenData = result.rows[0];
            // Check if token is already used
            if (tokenData.used) {
                return res.json({
                    success: true,
                    valid: false,
                    message: 'This reset link has already been used'
                });
            }
            // Check if token is expired
            if (new Date() > new Date(tokenData.expires_at)) {
                return res.json({
                    success: true,
                    valid: false,
                    message: 'This reset link has expired'
                });
            }
            res.json({
                success: true,
                valid: true
            });
        }
        catch (e) {
            console.error('[auth-service] Validate token error:', e);
            res.status(500).json({
                success: false,
                error: 'Failed to validate reset token'
            });
        }
    });
    // Reset password endpoint
    r.post('/reset-password', async (req, res) => {
        try {
            const { token, newPassword } = req.body;
            if (!token || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Token and new password are required'
                });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters long'
                });
            }
            // Get token data
            const tokenResult = await db_1.pool.query(`SELECT id, user_id, expires_at, used 
                 FROM password_reset_tokens 
                 WHERE token = $1`, [token]);
            if (tokenResult.rows.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid reset token'
                });
            }
            const tokenData = tokenResult.rows[0];
            // Check if token is already used
            if (tokenData.used) {
                return res.status(400).json({
                    success: false,
                    message: 'This reset link has already been used'
                });
            }
            // Check if token is expired
            if (new Date() > new Date(tokenData.expires_at)) {
                return res.status(400).json({
                    success: false,
                    message: 'This reset link has expired'
                });
            }
            // Hash the new password
            const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
            // Update user password
            await db_1.pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, tokenData.user_id]);
            // Mark token as used
            await db_1.pool.query('UPDATE password_reset_tokens SET used = true WHERE id = $1', [tokenData.id]);
            console.log(`[auth-service] Password successfully reset for user: ${tokenData.user_id}`);
            res.json({
                success: true,
                message: 'Password has been successfully reset'
            });
        }
        catch (e) {
            console.error('[auth-service] Reset password error:', e);
            res.status(500).json({
                success: false,
                message: 'Failed to reset password'
            });
        }
    });
    return r;
}
//# sourceMappingURL=routes.js.map