import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {ChattingTabService} from './chatting-tab.service';

declare const $: any;
@Component({
  selector: 'app-chatting-tab',
  templateUrl: './chatting-tab.component.html',
  styleUrls: ['./chatting-tab.component.css']
})
export class ChattingTabComponent implements OnInit {
  @ViewChild('frendListEle') frendListEle?: ElementRef;
  @ViewChild('metaRoomUserListEle') metaRoomUserListEle?: ElementRef;
  @ViewChildren('chattingtabEle') chattingtabEle?: ElementRef[];
  chattingTabType: ChattingTabType = ChattingTabType.친구목록;
  userCount: UserCount = {
    userCount: 0,
    frendCount: 0
  };

  constructor(private chattingTabSvc: ChattingTabService) { }

  ngOnInit(): void {
    this.chattingTabSvc.userCountEvt.subscribe(p => {
      this.userCount = p;
    })
  }

  clickFrandList() {
    this.chattingTabType = ChattingTabType.친구목록;
    const tab_id = $(this.frendListEle.nativeElement).attr("data-tab");
    this.chattingtabEle.forEach(p => $(p.nativeElement).removeClass("active"));
    $(".friend_list .chating_tab_area .tab_cont").removeClass("active");
    $(this.frendListEle.nativeElement).parent().addClass("active");
    $("#"+tab_id).addClass("active");
  }

  clickMetaRoomUserList() {
    this.chattingTabType = ChattingTabType.룸이용자;
    const tab_id = $(this.metaRoomUserListEle.nativeElement).attr("data-tab");
    this.chattingtabEle.forEach(p => $(p.nativeElement).removeClass("active"));
    $(".friend_list .chating_tab_area .tab_cont").removeClass("active");
    $(this.metaRoomUserListEle.nativeElement).parent().addClass("active");
    $("#"+tab_id).addClass("active");

  }
}

export enum ChattingTabType {
  친구목록,
  룸이용자
}

export interface UserCount {
  frendCount: number,
  userCount: number
}
