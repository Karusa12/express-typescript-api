import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { errorHandler } from './middlewares/errorHandler';
import { websocketHandler } from './routes/websocket';
import { generalLimiter } from './middlewares/rateLimiter';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// app.use(generalLimiter);

app.use(express.json());

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
  if (/\.js$/.test(file)) {
    const route = require(path.join(routesPath, file));
    const routePrefix = '/' + file.replace('.js', '');
    app.use(routePrefix, route.default);
  }
});

app.use(errorHandler);

app.get('/', (_req: Request, res: Response) => {
  res.send('API Express TypeScript is running!');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
  websocketHandler.handleUpgrade(request, socket, head);
});