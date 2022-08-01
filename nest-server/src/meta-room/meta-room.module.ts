import { Module } from '@nestjs/common';
import { MetaRoomService } from './meta-room.service';
import { MetaRoomController } from './meta-room.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {FrendSchema} from '../controller/frend/entities/frend.entity';
import {FrendService} from '../controller/frend/frend.service';

@Module({
  imports: [MongooseModule.forFeature(
    [{name: 'Frend', schema: FrendSchema}]
  )],
  controllers: [MetaRoomController],
  providers: [MetaRoomService, FrendService]
})
export class MetaRoomModule {}
