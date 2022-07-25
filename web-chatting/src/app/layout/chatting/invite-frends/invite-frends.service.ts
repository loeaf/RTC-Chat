import { Injectable } from '@angular/core';
import {Frend, FrendHttpService, Frends} from './frend-http.service';
import {User} from '../chatting/chatting-http.service';
import {ChannelManagerService} from '../channel/channel-manager.service';

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
    debugger;
    const channel = this.channelManagerService.selectChannel;
    const invite = await channel.inviteMembers([userIds]);
    const invite2 = await channel.acceptInvite();
  }
}
