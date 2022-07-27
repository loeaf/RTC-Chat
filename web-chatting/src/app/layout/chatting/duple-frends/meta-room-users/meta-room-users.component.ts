import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MetaRoomUsersService} from './meta-room-users.service';
import {InviteFrendsService} from '../../invite-frends/invite-frends.service';
import {User} from '../../user/user-http.service';
import {PopupManagerService, PopupType} from '../../component/popup/popup-manager.service';
import {FrendAcceptPopupService} from '../../component/popup/frend-accept-popup/frend-accept-popup.service';

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
              private frendAcceptPopupSvc: FrendAcceptPopupService,
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
    this.frendAcceptPopupSvc.frendRecProcPopUp({
      userId: this.userObj.id,
      frendId: user
    }, PopupType.친구초대);
  }
}
