import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Room, User} from '../http-service/chatting-http.service';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, lastValueFrom} from 'rxjs';

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


export interface Frend {
  id: string;
  userId: string;
  frendId: string;
  state: FrendRequestState;
}

export interface Frends {
  frends: Frend[];
}

export enum FrendRequestState {
  요청,
  승인,
  취소
}
export enum FrendState {
  일반,
  친구
}
