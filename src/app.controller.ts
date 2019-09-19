import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ChatGateway} from "./chat/chat.gateway";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly chatGateway: ChatGateway) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  public async pingClients(): Promise<string> {
    await this.chatGateway.broadcast("test message");
    return 'broadcast'
  }
}
