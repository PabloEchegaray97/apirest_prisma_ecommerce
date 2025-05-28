import express, { Request, Response } from 'express';
import sizeController from '../controllers/size.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await sizeController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await sizeController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await sizeController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await sizeController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await sizeController.create(req, res);
});

export { router as sizeRouter }; 