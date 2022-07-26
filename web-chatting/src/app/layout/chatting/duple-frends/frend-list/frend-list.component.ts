import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../user/user-http.service';
import {PopupManagerService, PopupType} from '../../component/popup/popup-manager.service';
import {FrendRequestState} from '../../invite-frends/frend-http.service';

@Component({
  selector: 'app-frend-list',
  templateUrl: './frend-list.component.html',
  styleUrls: ['./frend-list.component.css']
})
export class FrendListComponent implements OnInit {
  @Input()
  userObj: User;

  constructor(private popupManagerService: PopupManagerService) { }

  ngOnInit(): void {
  }

  deleteFrend(frendId: string) {
    this.popupManagerService.openPopupEvt.emit(PopupType.친구삭제);
    this.popupManagerService.frendsRecoDataEvt.emit({
      frend: {
        userId: this.userObj.id,
        frendId: frendId
      },
      uiStatus: PopupType.친구삭제
    });

  }
}
