import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChattingHttpService {

  constructor(private httpClient: HttpClient) { }

  getRooms(user: User): Promise<Room[] | undefined> {
    return this.httpClient.get<Room[]>(
      `${environment.mokServerUrl}/rooms?ownerId=${user.id}`
    ).toPromise();
  }

  getRoomsAll(): Promise<Room[] | undefined> {
    return this.httpClient.get<Room[]>(`${environment.mokServerUrl}/rooms`).toPromise();
  }

  postRooms(room: Room): Promise<Room | undefined> {
    return this.httpClient.post<Room>(
      `${environment.mokServerUrl}/rooms`, room
    ).toPromise();
  }

  postUser(user: User): Promise<User | undefined> {
    return this.httpClient.post<User>(
      `${environment.mokServerUrl}/users`, user
    ).toPromise();
  }

  getUser(user: User): Promise<Array<User> | undefined> {
    return this.httpClient.get<Array<User>>(
      `${environment.mokServerUrl}/users?id=${user.id}`
    ).toPromise();
  }

  async getTokenById(userId: string): Promise<Token> {
    return this.httpClient.get<any>(
      `${environment.apiServerUrl}/token/${userId}`
    ).toPromise();

  }
}

export interface Token {
  token: string;
}

export interface Room {
  id: string;
  ownerId: string;
  roomName: string;
}

export interface User {
  id: string;
  nickName?: string;
}

export enum ChattingStep {
  로그인필요,
  챗팅이용,
}
