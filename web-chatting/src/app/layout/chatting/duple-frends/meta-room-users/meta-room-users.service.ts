import { Injectable } from '@angular/core';
import {MetaRoomUsersHttpService} from './meta-room-users-http.service';
import {ChattingTabService} from '../chatting-tab/chatting-tab.service';

@Injectable({
  providedIn: 'root'
})
export class MetaRoomUsersService {
  metaRoom: MetaRoom;

  constructor(private metaRoomUsersHttpService: MetaRoomUsersHttpService,
              private chattingTabSvc: ChattingTabService) { }

  async initUserByMetaRoom(roomId: number) {
    const metaRoom = await this.metaRoomUsersHttpService.getUserByMetaRoomHttp(roomId);
    this.chattingTabSvc.userCountEvt.emit({
      frendCount: 0,
      userCount: metaRoom[0].users.length - 1
    })
    this.metaRoom = metaRoom[0];
    console.log(metaRoom);
  }
}

export interface MetaRoom {
  id: string;
  metaRoomName: string;
  users: string[];
}
