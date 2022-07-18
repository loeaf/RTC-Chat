import {Controller, Get, Param} from '@nestjs/common';
import { TokenService } from './token.service';
const StreamChat = require('stream-chat').StreamChat;
const serverClient = StreamChat.getInstance('dhefjeuw9yg5','k8n2fjatk2ms5bqr69k4rp732hrtqm6kysw8trv5t8vdq7xd4mqcjb99pt7rbe5x');

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get(':tokenParam')
  getToken(@Param() param): any {
    console.log(param);
    const token = serverClient.createToken(param.tokenParam);
    return {'token': token};
  }
}
