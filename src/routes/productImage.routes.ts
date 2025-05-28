import express, { Request, Response } from 'express';
import productImageController from '../controllers/productImage.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await productImageController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await productImageController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await productImageController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await productImageController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await productImageController.create(req, res);
});

export { router as productImageRouter }; 