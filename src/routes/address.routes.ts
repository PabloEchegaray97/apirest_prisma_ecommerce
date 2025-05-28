import express, { Request, Response } from 'express';
import addressController from '../controllers/address.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await addressController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await addressController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await addressController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await addressController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await addressController.create(req, res);
});

export { router as addressRouter }; 