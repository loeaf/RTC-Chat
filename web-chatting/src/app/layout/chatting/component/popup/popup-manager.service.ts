import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupManagerService {
  @Output()
  openPopup = new EventEmitter<PopupType>();
  @Output()
  closePopup = new EventEmitter<PopupType>();

  constructor() { }
}

export enum PopupType {
  친구초대,
  친구승인,
  친구삭제,
  챗팅이동
}
