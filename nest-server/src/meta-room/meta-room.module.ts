import { Module } from '@nestjs/common';
import { MetaRoomService } from './meta-room.service';
import { MetaRoomController } from './meta-room.controller';

@Module({
  controllers: [MetaRoomController],
  providers: [MetaRoomService]
})
export class MetaRoomModule {}
