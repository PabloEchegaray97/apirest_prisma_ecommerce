import express, { Request, Response } from 'express';
import productDiscountController from '../controllers/productDiscount.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await productDiscountController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await productDiscountController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await productDiscountController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await productDiscountController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await productDiscountController.create(req, res);
});

export { router as productDiscountRouter }; 