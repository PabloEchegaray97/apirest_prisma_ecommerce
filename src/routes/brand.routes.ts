import express, { Request, Response } from 'express';
import brandController from '../controllers/brand.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await brandController.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await brandController.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await brandController.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await brandController.delete(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
    await brandController.create(req, res);
});

export { router as brandRouter }; 