import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('initalized');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
