import express, { Request, Response } from 'express';
import detailController from '../controllers/detail.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await detailController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await detailController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await detailController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await detailController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await detailController.create(req, res);
});

export { router as detailRouter }; 