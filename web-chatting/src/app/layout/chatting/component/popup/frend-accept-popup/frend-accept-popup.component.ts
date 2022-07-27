import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PopupType} from '../popup-manager.service';
import {FrendAcceptPopupHttpService} from './frend-accept-popup-http.service';
import {Frend, FrendRequestState} from '../../../invite-frends/frend-http.service';
import {FrendAcceptPopupService} from './frend-accept-popup.service';

declare const layerClickOpenM: any;
declare const layerClickCloseM: any;

@Component({
  selector: 'app-frend-accept-popup',
  templateUrl: './frend-accept-popup.component.html',
  styleUrls: ['./frend-accept-popup.component.css']
})
export class FrendAcceptPopupComponent implements OnInit, AfterViewInit {
  popupType: PopupType;
  frend: Frend;

  constructor(private frendAcepPopupHttpSvc: FrendAcceptPopupHttpService,
              private frendAcceptPopupSvc: FrendAcceptPopupService) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.frendAcceptPopupSvc.openPopupEvt.subscribe(p => {
      if(p === PopupType.친구초대  || p === PopupType.친구승인 || p === PopupType.친구삭제) {
        this.popupType = p;
        layerClickOpenM('with_frend');
      }
    });
    this.frendAcceptPopupSvc.closePopupEvt.subscribe(p => {
      if(p === PopupType.친구초대  || p === PopupType.친구승인 || p === PopupType.친구삭제) {
        this.popupType = p;
        layerClickCloseM('with_frend');
      }
    });
    this.frendAcceptPopupSvc.frendsRecoDataEvt.subscribe(p => {
      this.popupType = p.uiStatus;
      this.frend = p.frend;
    })
  }

  onCancle() {
    this.frendAcceptPopupSvc.closePopupEvt.emit(this.popupType);
  }

  async onAccept() {
    debugger;
    const f = this.frend;
    if (this.popupType === PopupType.친구초대) {
      await this.frendAcepPopupHttpSvc.postRecoFrends(this.frend);
    } else if (this.popupType === PopupType.친구승인) {
      const f = this.frend;
      f.state = FrendRequestState.승인;
      await this.frendAcceptPopupSvc.frendAccept(f, this.popupType);
    } else if (this.popupType === PopupType.친구삭제) {
      await this.frendAcepPopupHttpSvc.deleteRecoFrends(f);
    }
    this.frendAcceptPopupSvc.closePopupEvt.emit(this.popupType);
  }

  async onDeny() {
    const f = this.frend;
    f.state = FrendRequestState.거절;
    await this.frendAcceptPopupSvc.frendAccept(f, this.popupType);
  }
}
