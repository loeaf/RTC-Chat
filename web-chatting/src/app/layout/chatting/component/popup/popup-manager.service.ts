import {EventEmitter, Injectable, Output} from '@angular/core';
import {Frend} from '../../invite-frends/frend-http.service';

@Injectable({
  providedIn: 'root'
})
export class PopupManagerService {
  @Output()
  openPopupEvt = new EventEmitter<PopupType>();
  @Output()
  closePopupEvt = new EventEmitter<PopupType>();
  @Output()
  frendsRecoDataEvt = new EventEmitter<FrendsRecommand>();

  constructor() { }
}
export interface FrendsRecommand {
  frend: Frend;
  uiStatus: PopupType;
}

export enum PopupType {
  친구초대,
  친구승인,
  친구삭제,
  메타방이동
}
