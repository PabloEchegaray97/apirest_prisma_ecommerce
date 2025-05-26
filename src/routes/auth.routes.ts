import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const controller = new AuthController();

// Login
router.post('/login', async (req: Request, res: Response) => {
    await controller.login(req, res);
});

// Register
router.post('/register', async (req: Request, res: Response) => {
    await controller.register(req, res);
});

export { router as authRouter }; 