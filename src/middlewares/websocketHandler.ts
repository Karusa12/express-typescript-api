import { WebSocket, WebSocketServer } from 'ws';

export class WebSocketHandler {
  private wss: WebSocketServer;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.setupConnection();
  }

  private setupConnection() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client is connected');

      ws.on('message', (message) => {
        this.wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(`Message from client: ${message}`);
          }
        });
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }

  public handleUpgrade(request: any, socket: any, head: any) {
    this.wss.handleUpgrade(request, socket, head, (ws) => {
      this.wss.emit('connection', ws, request);
    });
  }
}