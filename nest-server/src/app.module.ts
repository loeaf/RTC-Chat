import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { ChannelModule } from './channel/channel.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { FrendModule } from './controller/frend/frend.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import { MetaRoomModule } from './meta-room/meta-room.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: EnvSetting(),
      ignoreEnvFile: process.env.NODE_ENV === 'prod'
    }), TokenModule, ChannelModule, FrendModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_ID}:${process.env.DATABASE_PASSWORD}@chatting.m60fhbe.mongodb.net/nestjs-demo?retryWrites=true&w=majority`),
    WinstonModule.forRoot({
    transports: [
      new winston.transports.Console({
        level: process.env._ENV === 'prod' ? 'info' : 'silly',
        format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('nest-chatting-server', { prettyPrint: true }),
        ),
      }),
    ],
    }),
    MetaRoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function EnvSetting () {
  switch (process.env._ENV) {
    case 'local':
      return '.env.local';
      break;
    case 'dev':
      return '.env.dev';
      break;
    case 'release':
      return '.env.release';
      break;
    case 'prod':
      return '.env.prod';
      break;
    default:
      return '.env.local';
      break;
  }
}
