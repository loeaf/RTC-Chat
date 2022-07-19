import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import {AppService} from '../app.service';

@Module({
  controllers: [TokenController],
  providers: [TokenService, AppService]
})
export class TokenModule {}
