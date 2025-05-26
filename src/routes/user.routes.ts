import express, { Request, Response } from 'express';
import userController from '../controllers/user.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await userController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await userController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await userController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await userController.delete(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
    await userController.create(req, res);
});
router.post('/login', async (req: Request, res: Response) => {
    await userController.login(req, res);
});

export { router as userRouter }; 