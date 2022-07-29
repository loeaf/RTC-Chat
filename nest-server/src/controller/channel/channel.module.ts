import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import {AppService} from '../../app.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, AppService]
})
export class ChannelModule {}
