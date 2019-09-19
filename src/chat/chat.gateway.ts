import {
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() server;

  afterInit(server: any) {
    this.logger.log('initalized');
  }

    async handleConnection(client) {
        // Notify connected clients of current users
        this.server.emit("users", 'user connected');
    }

    async handleDisconnect() {
        // Notify connected clients of current users
        this.server.emit("users", 'user disconnected');
    }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

    public async broadcast(message: string) {
        this.server.emit("broadcast", message);
    }
}
