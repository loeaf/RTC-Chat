import {Controller, Get, Param} from '@nestjs/common';
import { TokenService } from './token.service';
import {AppService} from '../app.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService,
              private appSvc: AppService) {}

  @Get(':tokenParam')
  getToken(@Param() param): any {
    console.log(param);
    const token = this.appSvc.getServerClient().createToken(param.tokenParam);
    return {'token': token};
  }
}
