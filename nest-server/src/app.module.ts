import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [TokenModule, ChannelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
