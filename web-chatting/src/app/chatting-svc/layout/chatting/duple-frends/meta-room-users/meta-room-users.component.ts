import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MetaRoomUsersService} from './meta-room-users.service';
import {InviteFrendsService} from '../../invite-frends/invite-frends.service';
import {User} from '../../user/user-http.service';
import {PopupManagerService, PopupType} from '../../component/popup/popup-manager.service';
import {FrendAcceptPopupService} from '../../component/popup/frend-accept-popup/frend-accept-popup.service';
import {UserService} from '../../user/user.service';
import {ChattingTabService} from '../chatting-tab/chatting-tab.service';

@Component({
  selector: 'app-meta-room-users',
  templateUrl: './meta-room-users.component.html',
  styleUrls: ['./meta-room-users.component.css']
})
export class MetaRoomUsersComponent implements OnInit, AfterViewInit {
  constructor(public metaRoomUsersService: MetaRoomUsersService,
              private chattingTabService: ChattingTabService,
              private inviteFrendsSvc: InviteFrendsService,
              public userSvc: UserService,
              private frendAcceptPopupSvc: FrendAcceptPopupService,
              private popupManagerService: PopupManagerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.initMetaRoom();
    this.chattingTabService.onRoomUserTabClickEvt.subscribe(async p => {
      await this.initMetaRoom();
    })

    const windowObj: any = self.window;
    windowObj.webChat = {
      refreshRoomUserList: (data: any) => {
        this.metaRoomUsersService.refreshMetaRoom(data);
      }
    }
  }
  async initMetaRoom() {
    await this.metaRoomUsersService.initUserByMetaRoom(1);
  }

  addFrend(user: string) {
    this.frendAcceptPopupSvc.frendRecProcPopUp({
      userId: this.userSvc.getUser().id,
      frendId: user
    }, PopupType.친구초대);
  }
}
