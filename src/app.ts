import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando 10/10' });
});

export default app; 