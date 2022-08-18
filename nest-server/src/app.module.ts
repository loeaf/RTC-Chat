import {CacheModule, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { ChannelModule } from './controller/channel/channel.module';
import { FrendModule } from './controller/frend/frend.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import { MetaRoomModule } from './meta-room/meta-room.module';
import {LoggerMiddleware} from '../logger/LoggerMiddleware';
import {ChannelController} from './controller/channel/channel.controller';
import {FrendsController} from './controller/frend/frendsController';
import {MetaRoomController} from './meta-room/meta-room.controller';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { ChatRoomModule } from './controller/chat-room/chat-room.module';
import {UserInteractiveModule} from './socket/user-interactive/user-interactive.module';
import * as redisStore from 'cache-manager-ioredis';

// mongodb+srv://vaiv:eF4vBXcmbXBdV3tr@chatting.m60fhbe.mongodb.net/nestjs-demo
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: EnvSetting(),
      ignoreEnvFile: process.env.NODE_ENV === 'prod'
    }), TokenModule, ChannelModule, FrendModule,
    MongooseModule.forRoot(
      `mongodb+srv://chatting.m60fhbe.mongodb.net/nestjs-demo?
            retryWrites=true&w=majority`, {
        user: `${process.env.DATABASE_ID}`,
        pass: `${process.env.DATABASE_PASSWORD}`
      }),
    CacheModule.register({
      store: redisStore,
      host: 'redis-10126.c258.us-east-1-4.ec2.cloud.redislabs.com',
      port: 10126,
      no_ready_check: true,
      password: 'dufrJqdz16VXgp40qXlFxLXJaP1e8v3i',
      // auth_pass: 'dufrJqdz16VXgp40qXlFxLXJaP1e8v3i', // also tried password: 'azerty'
    }),
    MetaRoomModule,
    ChatRoomModule,
    UserInteractiveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AppController,
        ChannelController,
        FrendsController,
        MetaRoomController
      );
  }

}

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

