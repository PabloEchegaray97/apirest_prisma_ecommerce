import express, { Request, Response } from 'express';
import typeController from '../controllers/type.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await typeController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await typeController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await typeController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await typeController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await typeController.create(req, res);
});

export { router as typeRouter }; 