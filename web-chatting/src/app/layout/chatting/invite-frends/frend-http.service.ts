import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Room} from '../chatting/chatting-http.service';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {User} from '../user/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class FrendHttpService {

  constructor(private httpClient: HttpClient) { }

  getFrendsByUser(user: User): Promise<Frends | undefined> {
    return lastValueFrom(this.httpClient.get<Frends>(
      `${environment.apiServerUrl}/frends/${user.id}`
    ));
  }
}

export interface MetaRoomFrend {
  userId: string;
  userName?: string;
  isFrend?: boolean;
}

export interface Frend {
  _id?: string;
  userId: string;
  frendId: string;
  state?: FrendRequestState;
}

export interface Frends {
  frends: Frend[];
}

export enum FrendRequestState {
  요청,
  승인,
  거절
}
export enum FrendState {
  일반,
  친구
}
