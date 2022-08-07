import {EventEmitter, Injectable, Output} from '@angular/core';
import {PopupManagerService, PopupType} from '../popup-manager.service';
import {UtilsService} from '../../../../../utils/utils.service';
import {Frend, FrendRequestState} from '../../../invite-frends/frend-http.service';
import {FrendAcceptPopupHttpService} from './frend-accept-popup-http.service';
import {FrendListService} from '../../../duple-frends/frend-list/frend-list.service';
import {UserService} from '../../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FrendAcceptPopupService extends PopupManagerService{
  frendsAcceptListQue: Frend[] = [];
  constructor(private frendAcepPopupHttpSvc: FrendAcceptPopupHttpService,
              private userSvc: UserService,
              private frendListService: FrendListService) {
    super();
  }

  frendRecProcPopUp(frend: Frend, popUpType: PopupType) {
    this.openPopupEvt.emit(popUpType);
    if(popUpType === PopupType.친구초대) {
      this.frendsRecoDataEvt.emit({
        frend: {
          _id: UtilsService.genRandomNum(1, 10000)+'',
          userId: frend.userId,
          frendId: frend.frendId,
          state: FrendRequestState.요청
        },
        uiStatus: PopupType.친구초대
      });
    } else if (popUpType === PopupType.친구승인 || popUpType === PopupType.친구삭제) {
      this.frendsRecoDataEvt.emit({
        frend,
        uiStatus: popUpType
      });
    }
  }

  async frendAccept(f: Frend, popupType: PopupType) {
    // 친구 승인 또는 거절
    await this.frendAcepPopupHttpSvc.patchRecoFrends(f._id, f);
    const frends = await this.frendAcepPopupHttpSvc.getRecoFrends(this.userSvc.getUser().id);
    this.frendListService.renderFrendListEvt.emit(frends);
    // 돌면서 팝업처리
    if (this.frendsAcceptListQue.length > 0) {
      const o = this.frendsAcceptListQue.shift();
      this.frendRecProcPopUp(o, popupType);
    }
  }

}
