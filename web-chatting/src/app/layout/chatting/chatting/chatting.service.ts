import { Injectable } from '@angular/core';

declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class ChattingService {

  constructor() { }
  moveScrollDown() {
    $('#scrollboxEle').scrollTop($(document).height());
  }
}
