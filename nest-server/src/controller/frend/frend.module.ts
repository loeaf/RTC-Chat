import { Module } from '@nestjs/common';
import { FrendService } from './frend.service';
import { FrendController } from './frend.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {FrendSchema} from './entities/frend.entity';


@Module({
  imports: [MongooseModule.forFeature(
    [{name: 'Frend', schema: FrendSchema}]
  )],
  controllers: [FrendController],
  providers: [FrendService]
})
export class FrendModule {}
