import {Component, OnInit} from '@angular/core';
import {PopupManagerService, PopupType} from '../popup-manager.service';

declare const layerClickOpenM: any;
declare const layerClickCloseM: any;

@Component({
  selector: 'app-move-room-popup',
  templateUrl: './move-room-popup.component.html',
  styleUrls: ['./move-room-popup.component.css']
})
export class MoveRoomPopupComponent implements OnInit {
  popupType: PopupType;

  constructor(private popupManSvc: PopupManagerService) { }

  ngOnInit(): void {
    this.popupManSvc.openPopup.subscribe(p => {
      if(p === PopupType.챗팅이동) {
        this.popupType = p;
        layerClickOpenM('move_room');
      }
    })
    this.popupManSvc.closePopup.subscribe(p => {
      if(p === PopupType.챗팅이동) {
        this.popupType = p;
        layerClickCloseM('move_room');
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
