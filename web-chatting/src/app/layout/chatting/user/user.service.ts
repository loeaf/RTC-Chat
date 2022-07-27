import { Injectable } from '@angular/core';
import {User} from './user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static user: User;

  getUser() {
    return UserService.user;
  }

  constructor() { }
}
