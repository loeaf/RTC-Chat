import { Injectable } from '@angular/core';
import {MetaRoomUsersHttpService} from './meta-room-users-http.service';

@Injectable({
  providedIn: 'root'
})
export class MetaRoomUsersService {
  metaRoom: MetaRoom;

  constructor(private metaRoomUsersHttpService: MetaRoomUsersHttpService) { }

  async initUserByMetaRoom(roomId: number) {
    const metaRoom = await this.metaRoomUsersHttpService.getUserByMetaRoomHttp(roomId);
    this.metaRoom = metaRoom[0];
    console.log(metaRoom);
    debugger;
  }
}

export interface MetaRoom {
  id: string;
  metaRoomName: string;
  users: string[];
}
