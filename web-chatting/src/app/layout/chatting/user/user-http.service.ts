import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Frends} from '../invite-frends/frend-http.service';import {
  ChannelService,
  ChatClientService,
  CustomTemplatesService,
  DefaultStreamChatGenerics,
  StreamI18nService,
} from 'stream-chat-angular';
import {UserResponse} from 'stream-chat';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private httpClient: HttpClient) { }

  getUserInfoByUserId(userId: User): Promise<User[] | undefined> {
    return lastValueFrom(this.httpClient.get<User[]>(
      `${environment.apiServerUrl}/users?id=${userId}`
    ));
  }
}

export interface User {
  id: string;
  nickName?: string;
}

export interface SChatUser extends User, UserResponse {

}

