import express, { Request, Response } from 'express';
import colourController from '../controllers/colour.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await colourController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await colourController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await colourController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await colourController.delete(req, res);
});
router.post('/', validateJWT, async (req: Request, res: Response) => {
    await colourController.create(req, res);
});

export { router as colourRouter }; 