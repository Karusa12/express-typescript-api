import { Router } from 'express';
import { WebSocketHandler } from '../middlewares/websocketHandler';
import { websocketLimiter } from '../middlewares/rateLimiter';

const router = Router();
const wsHandler = new WebSocketHandler();

router.use(websocketLimiter);

router.get('/', (_req, res) => {
  res.status(200).send('WebSocket route is working!');
});

export const websocketHandler = wsHandler;
export default router;