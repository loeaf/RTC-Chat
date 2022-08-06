import { Injectable } from '@angular/core';
import {Frend, FrendHttpService, Frends} from './frend-http.service';
import {ChannelManagerService} from '../channel/channel-manager.service';
import {User} from '../user/user-http.service';
import {FrendAcceptPopupHttpService} from '../component/popup/frend-accept-popup/frend-accept-popup-http.service';

@Injectable({
  providedIn: 'root'
})
export class InviteFrendsService {
  frends: Frend[] = [];

  constructor(private frendHttpSvc: FrendHttpService,
              private frendAcceptPopupHttpService: FrendAcceptPopupHttpService,
              private channelManagerService: ChannelManagerService) { }
  async initFrendsByHttp(user: User) {
    debugger;
    const frends = await this.frendAcceptPopupHttpService.getRecoFrends(user.id);
    debugger;
    this.frends = frends.frends;
  }

  async inviteFrendsByRoom(userIds: string) {
    const channel = this.channelManagerService.selectChannel;
    const invite = await channel.inviteMembers([userIds]);
    const invite2 = await channel.acceptInvite();
  }
}
