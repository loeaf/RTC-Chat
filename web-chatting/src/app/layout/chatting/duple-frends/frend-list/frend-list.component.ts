import {Component, Input, OnInit} from '@angular/core';
import {SChatUser, User} from '../../user/user-http.service';
import {PopupType} from '../../component/popup/popup-manager.service';
import {Frend, Frends} from '../../invite-frends/frend-http.service';
import {FrendAcceptPopupService} from '../../component/popup/frend-accept-popup/frend-accept-popup.service';
import {FrendAcceptPopupHttpService} from '../../component/popup/frend-accept-popup/frend-accept-popup-http.service';
import {FrendListService} from './frend-list.service';
import {UserService} from '../../user/user.service';
import {ClientManagerService} from '../../user/client-manager.service';

@Component({
  selector: 'app-frend-list',
  templateUrl: './frend-list.component.html',
  styleUrls: ['./frend-list.component.css']
})
export class FrendListComponent implements OnInit {
  @Input()
  userObj: User;
  frends: SChatUser[];

  constructor(private frendAcceptPopupService: FrendAcceptPopupService,
              private frendListService: FrendListService,
              private userSvc: UserService,
              private clientManSvc: ClientManagerService,
              private frendAcceptPopupHttpService: FrendAcceptPopupHttpService) { }

  ngOnInit(): void {
    this.initFrendsList();
    this.frendListService.renderFrendListEvt.subscribe(async (frends) => {
      const arrayFrends = frends.frends.map(p => p.frendId);
      const response = await this.clientManSvc.getClient().queryUsers({ id: { $in: arrayFrends } });
      this.frends = response.users;
    })
  }
  async initFrendsList() {
    const frends = await this.frendAcceptPopupHttpService.getRecoFrends(this.userObj.id);
    debugger;
    const arrayFrends = frends.frends.map(p => p.frendId);
    const response = await this.clientManSvc.getClient().queryUsers({ id: { $in: arrayFrends } });
    this.frends = response.users;
  }

  deleteFrend(frendId: string) {
    this.frendAcceptPopupService.frendRecProcPopUp({
      userId: this.userObj.id,
      frendId
    }, PopupType.친구삭제)
  }
}
