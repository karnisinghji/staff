import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
    res.json({
        service: 'Communication Service',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.listen(PORT, () => {
    console.log(`📞 Communication Service running on port ${PORT}`);
    console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});
