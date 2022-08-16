import {Component, OnInit} from '@angular/core';
import {PopupManagerService, PopupType} from '../popup-manager.service';
import {ChannelManagerService} from '../../../channel/channel-manager.service';
import {UserService} from '../../../user/user.service';
import {ChattingService, ChattingUI} from '../../../chatting/chatting.service';

@Component({
  selector: 'app-out-room-popup',
  templateUrl: './out-room-popup.component.html',
  styleUrls: ['./out-room-popup.component.css']
})
export class OutRoomPopupComponent implements OnInit {
  popupType: PopupType;

  constructor(private popupManSvc: PopupManagerService,
              private userSvc: UserService,
              private chattingSvc: ChattingService,
              private channelManSvc: ChannelManagerService) { }

  ngOnInit(): void {
    this.popupManSvc.openPopupEvt.subscribe(p => {
      debugger;
      if(p === PopupType.챗팅방나가기) {
        this.popupType = p;
        layerClickOpenM('out_room');
      }
    })
    this.popupManSvc.closePopupEvt.subscribe(p => {
      if(p === PopupType.챗팅방나가기) {
        this.popupType = p;
        layerClickCloseM('out_room');
      }
    });
  }

  onCancle() {
    this.popupManSvc.closePopupEvt.emit(this.popupType);
  }

  async onAccept() {
    debugger;
    if (this.channelManSvc.selectChannel.master === true) {
      // 만약 내가 방장이라면 방 삭제
      await this.channelManSvc.removeChannel(this.channelManSvc.selectChannel);
    } else {
      // 아니라면 채널에서 나를 삭제
      await this.channelManSvc.removeUserBySelChannel(this.userSvc.getUser().id);
    }
    this.popupManSvc.closePopupEvt.emit(this.popupType);
    this.chattingSvc.changeChattingUI.emit(ChattingUI.듀플친구들);
  }
}
