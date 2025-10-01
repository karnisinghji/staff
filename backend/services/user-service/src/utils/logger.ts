import winston from 'winston';

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, service = 'user-service', ...meta }) => {
        return JSON.stringify({
            timestamp,
            level,
            message,
            service,
            ...meta
        });
    })
);

export const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// Add file transport for production
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({
        filename: 'logs/user-service-error.log',
        level: 'error'
    }));

    logger.add(new winston.transports.File({
        filename: 'logs/user-service-combined.log'
    }));
}