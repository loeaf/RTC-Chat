import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../user/user-http.service';
import {PopupType} from '../../component/popup/popup-manager.service';
import {Frend, Frends} from '../../invite-frends/frend-http.service';
import {FrendAcceptPopupService} from '../../component/popup/frend-accept-popup/frend-accept-popup.service';
import {FrendAcceptPopupHttpService} from '../../component/popup/frend-accept-popup/frend-accept-popup-http.service';
import {FrendListService} from './frend-list.service';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-frend-list',
  templateUrl: './frend-list.component.html',
  styleUrls: ['./frend-list.component.css']
})
export class FrendListComponent implements OnInit {
  frends: Frends = {
    frends: []
  };

  constructor(private frendAcceptPopupService: FrendAcceptPopupService,
              private userSvc: UserService,
              private frendListService: FrendListService,
              private frendAcceptPopupHttpService: FrendAcceptPopupHttpService) { }

  ngOnInit(): void {
    this.initFrendsList();
    this.frendListService.renderFrendListEvt.subscribe(frends => {
      this.frends = frends;
    })
  }
  async initFrendsList() {
    debugger;
    const frends = await this.frendAcceptPopupHttpService.getRecoFrends(UserService.user.id);
    debugger;
    this.frends = frends;
  }

  deleteFrend(frend: Frend) {
    this.frendAcceptPopupService.frendRecProcPopUp(frend, PopupType.친구삭제)
  }
}
