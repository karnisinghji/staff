import { Pool } from 'pg';
import { GetHealthUseCase } from './application/use-cases/GetHealthUseCase';
import { SendMessageUseCase } from './application/use-cases/SendMessageUseCase';
import { ListMessagesUseCase } from './application/use-cases/ListMessagesUseCase';
import { MarkMessageReadUseCase } from './application/use-cases/MarkMessageReadUseCase';
import { PgMessageRepository } from './infrastructure/persistence/PgMessageRepository';
import { InMemoryMessageRepository } from './infrastructure/persistence/InMemoryMessageRepository';

export interface CommunicationModule {
    useCases: {
        getHealth: GetHealthUseCase;
        sendMessage: SendMessageUseCase;
        listMessages: ListMessagesUseCase;
        markMessageRead: MarkMessageReadUseCase;
    };
}

// Create database pool from environment
function createDatabasePool(): Pool | null {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.warn('⚠️  DATABASE_URL not found - using in-memory message storage');
        return null;
    }

    return new Pool({
        connectionString,
        ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
    });
}

export function buildCommunicationModule(version = '1.0.0'): CommunicationModule {
    const pool = createDatabasePool();
    const messageRepo = pool
        ? new PgMessageRepository(pool)
        : new InMemoryMessageRepository();

    if (pool) {
        console.log('✅ Communication service using PostgreSQL for message storage');
    } else {
        console.log('⚠️  Communication service using in-memory message storage (messages will be lost on restart)');
    }

    return {
        useCases: {
            getHealth: new GetHealthUseCase(version),
            sendMessage: new SendMessageUseCase(messageRepo),
            listMessages: new ListMessagesUseCase(messageRepo),
            markMessageRead: new MarkMessageReadUseCase(messageRepo)
        }
    };
}
