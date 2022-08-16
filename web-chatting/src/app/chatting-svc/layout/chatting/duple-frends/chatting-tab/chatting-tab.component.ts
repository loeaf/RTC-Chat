import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
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

  constructor(
    private chattingTabService: ChattingTabService
  ) { }

  ngOnInit(): void {
  }

  clickFrandList() {
    const tab_id = $(this.frendListEle.nativeElement).attr("data-tab");
    this.chattingtabEle.forEach(p => $(p.nativeElement).removeClass("active"));
    $(".friend_list .chating_tab_area .tab_cont").removeClass("active");
    $(this.frendListEle.nativeElement).parent().addClass("active");
    $("#"+tab_id).addClass("active");
  }

  clickMetaRoomUserList() {
    const tab_id = $(this.metaRoomUserListEle.nativeElement).attr("data-tab");
    this.chattingtabEle.forEach(p => $(p.nativeElement).removeClass("active"));
    $(".friend_list .chating_tab_area .tab_cont").removeClass("active");
    $(this.metaRoomUserListEle.nativeElement).parent().addClass("active");
    $("#"+tab_id).addClass("active");
    this.chattingTabService.onRoomUserTabClickEvt.emit('');
  }
}
