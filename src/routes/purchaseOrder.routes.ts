import express, { Request, Response } from 'express';
import purchaseOrderController from '../controllers/purchaseOrder.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await purchaseOrderController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await purchaseOrderController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await purchaseOrderController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await purchaseOrderController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await purchaseOrderController.create(req, res);
});

export { router as purchaseOrderRouter }; 