
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the very top
import express from 'express';
console.log('JWT_SECRET (auth-service):', process.env.JWT_SECRET);
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { metricsMiddleware } from './metrics';

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Logging middleware
app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Metrics endpoint
app.get('/metrics', metricsMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        service: 'auth-service',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use('/api/auth', authRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    logger.info(`🔐 Auth Service running on port ${PORT}`);
    logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
});

export default app;