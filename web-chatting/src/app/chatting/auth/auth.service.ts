import { Injectable } from '@angular/core';
import {User} from '../layout/chatting/user/user-http.service';
import {UserService} from '../layout/chatting/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor() { }

  setLocalStorageAuth(user: User) {
    localStorage.setItem("token_value", `Bearer ${JSON.stringify(user)}`);
  }
  getLocalStorageAuth(): User {
    const token = localStorage.getItem("token_value");
    return JSON.parse(token.split(' ')[1]);
  }

}
