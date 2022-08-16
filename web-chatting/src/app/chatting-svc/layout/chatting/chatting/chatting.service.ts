import {EventEmitter, Injectable, Output} from '@angular/core';

declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  @Output()
  changeChattingUI = new EventEmitter<ChattingUI>();

  constructor() { }
  moveScrollDown() {
    $('#scrollboxEle').scrollTop(999999);
  }
}
export enum ChattingUI {
  "챗팅방" = "chating_room_open",
  "듀플친구들" = "friend_list_open",
  "친구초대" = "chating_invite_open"
}
