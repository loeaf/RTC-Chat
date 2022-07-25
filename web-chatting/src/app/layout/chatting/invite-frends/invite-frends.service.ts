import { Injectable } from '@angular/core';
import {Frend, FrendHttpService, Frends} from './frend-http.service';
import {User} from '../chatting/chatting-http.service';
import {ChannelManagerService} from '../service/channel-manager.service';

@Injectable({
  providedIn: 'root'
})
export class InviteFrendsService {
  frends: Frend[] = [];

  constructor(private frendHttpSvc: FrendHttpService,
              private channelManagerService: ChannelManagerService) { }
  async initFrendsByHttp(user: User) {
    this.frends = [];
    const frends = await this.frendHttpSvc.getFrendsByUser(user);
    this.frends = frends.frends;
  }

  async inviteFrendsByRoom(userIds: string) {
    const channel = this.channelManagerService.selectChannel;
    const result = await channel.inviteMembers([userIds]);
    debugger;
  }
}
