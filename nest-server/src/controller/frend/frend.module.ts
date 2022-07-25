import { Module } from '@nestjs/common';
import { FrendService } from './frend.service';
import { FrendsController } from './frendsController';
import {MongooseModule} from '@nestjs/mongoose';
import {FrendSchema} from './entities/frend.entity';


@Module({
  imports: [MongooseModule.forFeature(
    [{name: 'Frend', schema: FrendSchema}]
  )],
  controllers: [FrendsController],
  providers: [FrendService]
})
export class FrendModule {}
