import { Injectable } from '@angular/core';
import {Frend, FrendHttpService, Frends} from './frend-http.service';
import {User} from '../http-service/chatting-http.service';

@Injectable({
  providedIn: 'root'
})
export class InviteFrendsService {
  frends: Frend[] = [];

  constructor(private frendHttpSvc: FrendHttpService) { }
  async initFrendsByHttp(user: User) {
    this.frends = [];
    const frends = await this.frendHttpSvc.getFrendsByUser(user);
    this.frends = frends.frends;
  }
}
