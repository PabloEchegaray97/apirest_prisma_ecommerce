import express, { Request, Response } from 'express';
import discountController from '../controllers/discount.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await discountController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await discountController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await discountController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await discountController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await discountController.create(req, res);
});

export { router as discountRouter }; 