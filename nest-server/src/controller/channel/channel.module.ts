import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import {AppService} from '../../app.service';
import {TokenService} from '../../token/token.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, AppService, TokenService]
})
export class ChannelModule {}
