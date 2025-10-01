import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/AuthService';
import { logger } from '../utils/logger';
import { generateToken, verifyToken } from '../utils/jwt';

interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // User signup
    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password, role } = req.body;

            // Check if user already exists
            const existingUser = await this.authService.findUserByUsername(username);
            if (existingUser) {
                res.status(400).json({
                    success: false,
                    message: 'User with this username already exists'
                });
                return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create user
            const user = await this.authService.createUser({
                username,
                password: hashedPassword,
                role
            });

            // Generate JWT token
            const token = generateToken({
                id: user.id,
                username: user.username,
                role: user.role
            });

            logger.info(`User registered: ${username} as ${role}`);

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: {
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            logger.error('Signup error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    // User login
    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;

            // Find user
            const user = await this.authService.findUserByUsername(username);
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
                return;
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
                return;
            }

            // Generate JWT token
            const token = generateToken({
                id: user.id,
                username: user.username,
                role: user.role
            });

            logger.info(`User logged in: ${username}`);

            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            logger.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    // Refresh token
    refreshToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token } = req.body;

            if (!token) {
                res.status(401).json({
                    success: false,
                    message: 'Token is required'
                });
                return;
            }

            // Verify and decode the token
            const decoded = verifyToken(token);

            // Generate new token
            const newToken = generateToken({
                id: decoded.id,
                username: decoded.username,
                role: decoded.role
            });

            res.json({
                success: true,
                data: { token: newToken }
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
    };

    // Logout
    logout = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            // In a real implementation, you might want to blacklist the token
            // For now, we'll just return success
            logger.info(`User logged out: ${req.user?.email}`);

            res.json({
                success: true,
                message: 'Logout successful'
            });
        } catch (error) {
            logger.error('Logout error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    // Get user profile
    getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }

            const user = await this.authService.findUserById(userId);
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
                return;
            }

            res.json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    location: user.location
                }
            });
        } catch (error) {
            logger.error('Get profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };


    // Change password
    changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.id;
            const { currentPassword, newPassword } = req.body;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }

            const user = await this.authService.findUserById(userId);
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
                return;
            }

            // Verify current password
            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isCurrentPasswordValid) {
                res.status(400).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
                return;
            }

            // Hash new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 12);

            // Update password
            await this.authService.updatePassword(userId, hashedNewPassword);

            logger.info(`Password changed for user: ${user.email}`);

            res.json({
                success: true,
                message: 'Password changed successfully'
            });
        } catch (error) {
            logger.error('Change password error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    // Get all users (admin functionality)
    getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            // Add admin check here in future
            const users = await this.authService.getAllUsers();

            res.json({
                success: true,
                data: users.map((user: any) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    location: user.location,
                    createdAt: user.created_at
                }))
            });
        } catch (error) {
            logger.error('Get all users error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };
}