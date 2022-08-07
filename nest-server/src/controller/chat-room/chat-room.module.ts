import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomController } from './chat-room.controller';
import {TokenService} from '../../token/token.service';
import {MongooseModule} from '@nestjs/mongoose';
import {FrendSchema} from '../frend/entities/frend.entity';
import {ChatRoomSchema} from './entities/chat-room.entity';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: 'Frend', schema: FrendSchema},
      {name: 'ChatRoom', schema: ChatRoomSchema},
    ]
  )],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, TokenService]
})
export class ChatRoomModule {}
