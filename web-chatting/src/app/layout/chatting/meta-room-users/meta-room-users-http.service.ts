import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../http-service/chatting-http.service';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Frends} from '../invite-frends/frend-http.service';
import {MetaRoom} from './meta-room-users.service';

@Injectable({
  providedIn: 'root'
})
export class MetaRoomUsersHttpService {

  constructor(private httpClient: HttpClient) { }

  getUserByMetaRoomHttp(roomId: number): Promise<MetaRoom[] | undefined> {
    return lastValueFrom(this.httpClient.get<MetaRoom[]>(
      `${environment.mokServerUrl}/userMetaRoom?id=${roomId}`
    ));
  }
}
