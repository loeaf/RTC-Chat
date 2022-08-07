import {Controller, Get, Param} from '@nestjs/common';
import { TokenService } from './token.service';
import {AppService} from '../app.service';
import {StreamChat} from 'stream-chat';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService,
              private appSvc: AppService) {}

  @Get(':tokenParam')
  getToken(@Param() param): any {
    console.info(param);
    const token = this.tokenService.getInstance().createToken(param.tokenParam);
    return {'token': token};
  }
}
