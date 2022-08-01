import { Module } from '@nestjs/common';
import { MetaRoomService } from './meta-room.service';
import { MetaRoomController } from './meta-room.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {FrendSchema} from '../controller/frend/entities/frend.entity';

@Module({
  imports: [MongooseModule.forFeature(
    [{name: 'Frend', schema: FrendSchema}]
  )],
  controllers: [MetaRoomController],
  providers: [MetaRoomService]
})
export class MetaRoomModule {}
