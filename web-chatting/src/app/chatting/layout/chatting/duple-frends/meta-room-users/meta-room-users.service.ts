import { Injectable } from '@angular/core';
import {MetaRoomUsersHttpService} from './meta-room-users-http.service';
import {User} from '../../user/user-http.service';
import {MetaRoomFrend} from '../../invite-frends/frend-http.service';

@Injectable({
  providedIn: 'root'
})
export class MetaRoomUsersService {
  roomUser: MetaRoomFrend[];

  constructor(private metaRoomUsersHttpService: MetaRoomUsersHttpService) { }

  async initUserByMetaRoom(roomId: number) {
    const metaRoom = await this.metaRoomUsersHttpService.getUserByMetaRoomHttp(roomId);
    this.roomUser = metaRoom;
    debugger;
    console.log(metaRoom);
  }
}
