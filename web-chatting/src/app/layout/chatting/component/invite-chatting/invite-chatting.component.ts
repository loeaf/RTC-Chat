import {Component, Input, OnInit} from '@angular/core';
import {InviteFrendsService} from '../../invite-frends/invite-frends.service';
import {ChannelManagerService} from '../../channel/channel-manager.service';
import {PopupManagerService, PopupType} from '../popup/popup-manager.service';

declare const $: any;
@Component({
  selector: 'app-invite-chatting',
  templateUrl: './invite-chatting.component.html',
  styleUrls: ['./invite-chatting.component.css']
})
export class InviteChattingComponent implements OnInit {
  @Input()
  userId: string;
  @Input()
  frendId: string;

  constructor(private inviteFrendsSvc: InviteFrendsService,
              private channelManSvc: ChannelManagerService,
              private popupManSvc: PopupManagerService) { }

  ngOnInit(): void {
  }

  async inviteUserByRoom() {
    $("#chating_wrap").removeClass("friend_list_open");
    $("#chating_wrap").removeClass("chating_invite_open");
    $("#chating_wrap").addClass("chating_room_open");
    $('.chating_widget_chat',parent.document).addClass('chating_room_iframe_wrap');
    $('#chating_room_open_btn',parent.document).addClass('on');
    await this.channelManSvc.createChannelByIdAndFrends(this.userId, this.frendId);
    // await this.inviteFrendsSvc.inviteFrendsByRoom(this.userId);
    // alert(`${this.userId}가 초대되었습니다`);
  }
}
