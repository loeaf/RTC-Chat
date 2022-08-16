import {Component, OnInit} from '@angular/core';
import {PopupManagerService, PopupType} from '../popup-manager.service';

@Component({
  selector: 'app-move-room-popup',
  templateUrl: './move-room-popup.component.html',
  styleUrls: ['./move-room-popup.component.css']
})
export class MoveRoomPopupComponent implements OnInit {
  popupType: PopupType;

  constructor(private popupManSvc: PopupManagerService) { }

  ngOnInit(): void {
    this.popupManSvc.openPopupEvt.subscribe(p => {
      if(p === PopupType.메타방이동) {
        this.popupType = p;
        layerClickOpenM('move_room');
      }
    })
    this.popupManSvc.closePopupEvt.subscribe(p => {
      if(p === PopupType.메타방이동) {
        this.popupType = p;
        layerClickCloseM('move_room');
      }
    });
  }

  onCancle() {
    this.popupManSvc.closePopupEvt.emit(this.popupType);
  }

  onAccept() {
    this.popupManSvc.closePopupEvt.emit(this.popupType);
  }
}
