import express, { Request, Response } from 'express';
import productSizeController from '../controllers/productSize.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await productSizeController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await productSizeController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await productSizeController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await productSizeController.delete(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
    await productSizeController.create(req, res);
});

export { router as productSizeRouter }; 