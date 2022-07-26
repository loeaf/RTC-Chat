import {Component, Input, OnInit} from '@angular/core';
import {PopupManagerService, PopupType} from '../popup-manager.service';
import {FrendAcceptPopupHttpService} from './frend-accept-popup-http.service';
import {FrendRequestState} from '../../../invite-frends/frend-http.service';

declare const layerClickOpenM: any;
declare const layerClickCloseM: any;

@Component({
  selector: 'app-frend-accept-popup',
  templateUrl: './frend-accept-popup.component.html',
  styleUrls: ['./frend-accept-popup.component.css']
})
export class FrendAcceptPopupComponent implements OnInit {
  popupType: PopupType;
  @Input()
  userId: string;
  @Input()
  frendId: string;

  constructor(private popupManSvc: PopupManagerService,
              private frendAcepPopupHttpSvc: FrendAcceptPopupHttpService) { }

  ngOnInit(): void {
    this.popupManSvc.openPopupEvt.subscribe(p => {
      if(p === PopupType.친구초대  || p === PopupType.친구승인) {
        this.popupType = p;
        layerClickOpenM('with_frend');
      }
    });
    this.popupManSvc.closePopupEvt.subscribe(p => {
      if(p === PopupType.친구초대  || p === PopupType.친구승인) {
        this.popupType = p;
        layerClickCloseM('with_frend');
      }
    });
    this.popupManSvc.frendsRecoDataEvt.subscribe(p => {
      if (p.uiStatus === PopupType.친구초대) {
        // 친구 초대 api
        this.frendAcepPopupHttpSvc.postRecoFrends(p.frend);
      } else if (p.uiStatus === PopupType.친구승인) {
        this.frendAcepPopupHttpSvc.patchRecoFrends(p.frend.userId, p.frend);
        // 친구 승인 api
      } else if (p.uiStatus === PopupType.친구삭제) {
        this.frendAcepPopupHttpSvc.deleteRecoFrends(p.frend.frendId);
      }
    })
  }

  onCancle() {
    this.popupManSvc.closePopupEvt.emit(this.popupType);
  }

  onAccept() {
    this.popupManSvc.closePopupEvt.emit(this.popupType);
    let frendRequestState = null;
    if (this.popupType === PopupType.친구초대) {
      frendRequestState = FrendRequestState.요청;
    } else if (this.popupType === PopupType.친구승인) {
      frendRequestState = FrendRequestState.승인;
    } else if (this.popupType === PopupType.친구삭제) {
      frendRequestState = FrendRequestState.거절;
    }
  }
}
