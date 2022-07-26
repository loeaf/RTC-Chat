import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MetaRoomUsersService} from './meta-room-users.service';
import {InviteFrendsService} from '../../invite-frends/invite-frends.service';
import {User} from '../../user/user-http.service';
import {PopupManagerService, PopupType} from '../../component/popup/popup-manager.service';
import {FrendRequestState} from '../../invite-frends/frend-http.service';

@Component({
  selector: 'app-meta-room-users',
  templateUrl: './meta-room-users.component.html',
  styleUrls: ['./meta-room-users.component.css']
})
export class MetaRoomUsersComponent implements OnInit, AfterViewInit {
  @Input()
  userObj: User;

  constructor(public metaRoomUsersService: MetaRoomUsersService,
              private inviteFrendsSvc: InviteFrendsService,
              private popupManagerService: PopupManagerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMetaRoom();
  }
  async initMetaRoom() {
    await this.metaRoomUsersService.initUserByMetaRoom(1);
  }

  addFrend(user: string) {
    this.popupManagerService.openPopupEvt.emit(PopupType.친구초대);
    this.popupManagerService.frendsRecoDataEvt.emit({
      frend: {
        userId: this.userObj.id,
        frendId: user,
        state: FrendRequestState.요청
      },
      uiStatus: PopupType.친구초대
    });
  }
}
