import { Router } from 'express';
import { WebSocketHandler } from '../middlewares/websocketHandler';

const router = Router();
const wsHandler = new WebSocketHandler();

router.get('/', (_req, res) => {
  res.status(200).send('WebSocket route is working!');
});

export const websocketHandler = wsHandler;
export default router;