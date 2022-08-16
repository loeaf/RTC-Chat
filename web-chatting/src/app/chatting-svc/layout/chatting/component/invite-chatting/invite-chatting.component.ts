import {Component, Input, OnInit} from '@angular/core';
import {InviteFrendsService} from '../../invite-frends/invite-frends.service';
import {ChannelManagerService} from '../../channel/channel-manager.service';
import {PopupManagerService} from '../popup/popup-manager.service';
import {UserService} from '../../user/user.service';
import {ChattingService, ChattingUI} from '../../chatting/chatting.service';

declare const $: any;
@Component({
  selector: 'app-invite-chatting',
  templateUrl: './invite-chatting.component.html',
  styleUrls: ['./invite-chatting.component.css']
})
export class InviteChattingComponent implements OnInit {
  @Input()
  frendId: string;

  constructor(private inviteFrendsSvc: InviteFrendsService,
              private channelManSvc: ChannelManagerService,
              private userSvc: UserService,
              private chattingSvc: ChattingService,
              private popupManSvc: PopupManagerService) { }

  ngOnInit(): void {
  }

  async inviteUserByRoom() {
    this.chattingSvc.changeChattingUI.emit(ChattingUI.챗팅방);
    $('.chating_widget_chat',parent.document).addClass('chating_room_iframe_wrap');
    $('#chating_room_open_btn',parent.document).addClass('on');
    await this.channelManSvc.createChannelByIdAndFrends(this.userSvc.getUser().id, this.frendId);
    // await this.inviteFrendsSvc.inviteFrendsByRoom(this.userId);
    // alert(`${this.userId}가 초대되었습니다`);
  }
}
