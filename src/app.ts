import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';
import { authRouter } from './routes/auth.routes';
import cors from 'cors';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const API_PREFIX = process.env.API_V1_PREFIX || '/api/v1';
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/auth`, authRouter);

app.get('/', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'API is running 10/10',
        version: '1.0.0'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

export default app; 