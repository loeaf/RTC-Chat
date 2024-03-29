import {Controller, Get, Param} from '@nestjs/common';
import { ChannelService } from './channel.service';
import {AppService} from '../../app.service';
import {TokenService} from '../../token/token.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService,
              private tokenSvc: TokenService,
              private appSvc: AppService) {}

    // @todo 수정하던지 지우던지...
  // @Get(':user')
  // async getChannel(@Param() param) {
  //     console.info(param.user);
  //     const filter = { type: 'messaging', members: { $in: [param.user] } };
  //     const sort = { last_message_at: -1 };
  //     const channels = await this.tokenSvc.getServerClient().queryChannels(filter, sort, {
  //       watch: true, // this is the default
  //       state: true,
  //     });
  //     channels.map((channel) => {
  //       console.info(channel.data.name, channel.cid)
  //     })
  //     return channels;
  // }
}
