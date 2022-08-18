import { Module } from '@nestjs/common';
import { UserInteractiveService } from './user-interactive.service';
import { UserInteractiveGateway } from './user-interactive.gateway';

@Module({
  providers: [UserInteractiveGateway, UserInteractiveService]
})
export class UserInteractiveModule {}
