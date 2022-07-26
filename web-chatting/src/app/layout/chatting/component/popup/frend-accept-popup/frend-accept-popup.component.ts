import { Component, OnInit } from '@angular/core';
import {PopupManagerService, PopupType} from '../popup-manager.service';

declare const layerClickOpenM: any;
declare const layerClickCloseM: any;

@Component({
  selector: 'app-frend-accept-popup',
  templateUrl: './frend-accept-popup.component.html',
  styleUrls: ['./frend-accept-popup.component.css']
})
export class FrendAcceptPopupComponent implements OnInit {
  popupType: PopupType;

  constructor(private popupManSvc: PopupManagerService) { }

  ngOnInit(): void {
    this.popupManSvc.openPopup.subscribe(p => {
      if(p === PopupType.친구초대  || p === PopupType.친구승인) {
        this.popupType = p;
        layerClickOpenM('with_frend');
      }
    });
    this.popupManSvc.closePopup.subscribe(p => {
      if(p === PopupType.친구초대  || p === PopupType.친구승인) {
        this.popupType = p;
        layerClickCloseM('with_frend');
      }
    });
  }

  onCancle() {
    this.popupManSvc.closePopup.emit(this.popupType);
  }

  onAccept() {
    this.popupManSvc.closePopup.emit(this.popupType);
  }
}
