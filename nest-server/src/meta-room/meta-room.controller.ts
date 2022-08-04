import {Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import { MetaRoomService } from './meta-room.service';
import {Frends} from '../controller/frend/entities/frend.entity';
import {Request} from 'express';
import {AuthGuard, CustomRequest} from '../auth/auth-guard';

@Controller('meta-room')
@UseGuards(AuthGuard)
export class MetaRoomController {
  constructor(private readonly metaRoomService: MetaRoomService) {}

  /**
   * 특정방에 해당 아이디에 대한 친구가 있는지 학인하는 API
   */
  @Get(':roomId')
  async findMetaRoomById(@Req() req: CustomRequest,
                         @Param('roomId') roomId: string) {
    console.info('메타룸 진입');
    return await this.metaRoomService.findMetaRoomById(req.userId, roomId);
  }
}

export interface MetaRoom {

}
