import {EventEmitter, Injectable, Output} from '@angular/core';
import {Frend, FrendRequestState} from '../../invite-frends/frend-http.service';
import {UtilsService} from '../../../../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class PopupManagerService {
  @Output()
  public openPopupEvt = new EventEmitter<PopupType>();
  @Output()
  public closePopupEvt = new EventEmitter<PopupType>();
  @Output()
  public frendsRecoDataEvt = new EventEmitter<FrendsRecommand>();

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
  메타방이동,
  챗팅방나가기
}
