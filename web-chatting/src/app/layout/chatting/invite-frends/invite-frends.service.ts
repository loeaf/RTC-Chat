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
    const resultFrend = [];
    const frends = await this.frendAcceptPopupHttpService.getRecoFrends(user.id);
    const mem = await this.channelManagerService.getSelectChannelMamber();
    for (const frend of frends.frends) {
      let isFrend = false;
      isFrend = mem.some((p: any) => p.user_id === frend.frendId);
      if(isFrend === false) {
        resultFrend.push(frend);
      }
    }
    this.frends = resultFrend;
  }

  async inviteFrendsByRoom(userIds: string) {
    const channel = this.channelManagerService.selectChannel;
    const invite = await channel.inviteMembers([userIds]);
    const invite2 = await channel.acceptInvite();
  }
}
