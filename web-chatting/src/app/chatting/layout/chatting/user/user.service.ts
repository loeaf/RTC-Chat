import { Injectable } from '@angular/core';
import {User} from './user-http.service';
import {AuthService} from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  getUser() {
    if(this.user === undefined) {
      this.user = this.authSvc.getLocalStorageAuth();
    }
    return this.user;
  }

  constructor(private authSvc: AuthService) { }
}
