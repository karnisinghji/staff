import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import matchingRoutes from './routes/matchingRoutes';
import adminRoutes from './routes/adminRoutes';
import { logger } from './utils/logger';
import { metricsMiddleware } from './metrics';

// Load environment variables explicitly from the service root so CWD does not matter
// When running via concurrently from repo root, process.cwd() may not be this service directory.
// Use path relative to compiled file location (dist) OR src when using ts-node.
const serviceEnvPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: serviceEnvPath });

// Fallback load (in case running directly in service directory so first already worked)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
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
app.use('/', matchingRoutes);
app.use('/', adminRoutes);

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

// Start server unless running under test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`🔍 Matching Service running on port ${PORT}`);
        logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
        logger.info(`🔧 Max matching distance: ${process.env.MAX_MATCHING_DISTANCE_KM || 50}km`);
        logger.info(`🎯 Default search radius: ${process.env.DEFAULT_SEARCH_RADIUS_KM || 25}km`);
    });
}

export default app;