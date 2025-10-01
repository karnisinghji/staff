
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the very top
import express from 'express';
console.log('JWT_SECRET (user-service):', process.env.JWT_SECRET);
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import { logger } from './utils/logger';
import { metricsMiddleware } from './metrics';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:5173', // frontend
        'http://localhost:3000', // gateway
        ...(process.env.ALLOWED_ORIGINS?.split(',') || [])
    ],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(morgan('combined', {
    stream: {
        write: (message: string) => {
            logger.info(message.trim());
        }
    }
}));

// Metrics endpoint
app.get('/metrics', metricsMiddleware);

// Routes
app.use('/', userRoutes);

// 404 handler
app.use('*', (req, res) => {
    logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Graceful shutdown
process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    logger.info(`👥 User Service running on port ${PORT}`);
    logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
});

export default app;