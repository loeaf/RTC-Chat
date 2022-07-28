import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserCount} from './chatting-tab.component';

@Injectable({
  providedIn: 'root'
})
export class ChattingTabService {
  @Output()
  userCountEvt = new EventEmitter<UserCount>();

  constructor() { }
}
