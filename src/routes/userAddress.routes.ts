import express, { Request, Response } from 'express';
import userAddressController from '../controllers/userAddress.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await userAddressController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await userAddressController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await userAddressController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await userAddressController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await userAddressController.create(req, res);
});

export { router as userAddressRouter }; 