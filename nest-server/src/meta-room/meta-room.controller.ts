import {Controller, Get, Param} from '@nestjs/common';
import { MetaRoomService } from './meta-room.service';

@Controller('meta-room')
export class MetaRoomController {
  constructor(private readonly metaRoomService: MetaRoomService) {}
}

export interface MetaRoom {

}
