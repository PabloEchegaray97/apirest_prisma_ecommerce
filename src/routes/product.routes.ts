import express, { Request, Response } from 'express';
import productController from '../controllers/product.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await productController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await productController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await productController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await productController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await productController.create(req, res);
});

export { router as productRouter }; 