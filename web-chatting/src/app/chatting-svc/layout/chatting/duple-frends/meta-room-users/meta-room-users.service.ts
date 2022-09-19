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

  refreshMetaRoom(metaRoomUser: MetaRoomUser[]) {
    console.log('초기화 할 목록은 아래와 같다');
    console.log(`${JSON.stringify(metaRoomUser)}`);
    const displayArray = [];
    for (const p of metaRoomUser) {
      displayArray.push({
        userId: p.userId,
        userName: p.userName,
        isFrend: false
      })
    }
    this.roomUser = displayArray;
  }
}


export interface MetaRoomUser {
  userId: string;
  userName: string;
  photo: string;
}
