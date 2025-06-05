import { Router, Request, Response, NextFunction } from 'express';
import { getAllUsers, getUserById } from '../controllers/userController';
import { strictLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.use(strictLimiter);

router.get('/', async (req: Request, res: Response, next: NextFunction) => getAllUsers(req, res, next));
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => getUserById(req, res, next));

export default router;