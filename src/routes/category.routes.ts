import express, { Request, Response } from 'express';
import categoryController from '../controllers/category.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await categoryController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await categoryController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await categoryController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await categoryController.delete(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
    await categoryController.create(req, res);
});

export { router as categoryRouter }; 