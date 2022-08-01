import {Controller, Get, Param} from '@nestjs/common';
import { MetaRoomService } from './meta-room.service';
import {Frends} from '../controller/frend/entities/frend.entity';

@Controller('meta-room')
export class MetaRoomController {
  constructor(private readonly metaRoomService: MetaRoomService) {}

  /**
   * id를 통해 친구목록을 가지고 온다.
   */
  @Get(':userId/:roomId')
  async findMetaRoomById(@Param('userId') userId: string,
                         @Param('roomId') roomId: string) {
    return await this.metaRoomService.findMetaRoomById(userId, roomId);
  }
}

export interface MetaRoom {

}
