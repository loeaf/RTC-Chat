import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChattingTabService {
  @Output()
  onRoomUserTabClickEvt = new EventEmitter<any>();

  constructor() { }
}
