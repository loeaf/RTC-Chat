import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvirmentModule } from './envirment/envirment.module';

@Module({
  imports: [EnvirmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
