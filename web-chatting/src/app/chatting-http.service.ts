import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChattingHttpService {

  constructor(private httpClient: HttpClient) { }

  getRooms(user: User): Promise<Room[] | undefined> {
    return this.httpClient.get<Room[]>(
      `http://localhost:3000/rooms?ownerId=${user.id}`
    ).toPromise();
  }

  getRoomsAll(): Promise<Room[] | undefined> {
    return this.httpClient.get<Room[]>(`http://localhost:3000/rooms`).toPromise();
  }

  postRooms(room: Room): Promise<Room | undefined> {
    return this.httpClient.post<Room>(
      `http://localhost:3000/rooms`, room
    ).toPromise();
  }

  postUser(user: User): Promise<User | undefined> {
    return this.httpClient.post<User>(
      `http://localhost:3000/users`, user
    ).toPromise();
  }

  getUser(user: User): Promise<Array<User> | undefined> {
    return this.httpClient.get<Array<User>>(
      `http://localhost:3000/users?id=${user.id}`
    ).toPromise();
  }
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
