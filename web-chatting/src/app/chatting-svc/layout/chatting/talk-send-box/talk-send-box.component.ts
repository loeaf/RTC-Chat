import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ClientManagerService} from '../user/client-manager.service';
import {MessageManagerService} from '../message/message-manager.service';
import {ChannelManagerService} from '../channel/channel-manager.service';
import {InviteFrendsService} from '../invite-frends/invite-frends.service';
import {User} from '../user/user-http.service';
import {ChattingService, ChattingUI} from '../chatting/chatting.service';

declare const $: any;
@Component({
  selector: 'app-talk-send-box',
  templateUrl: './talk-send-box.component.html',
  styleUrls: ['./talk-send-box.component.css']
})
export class TalkSendBoxComponent implements OnInit {
  @Input()
  hasAttachment: boolean;
  @Input()
  user: User
  @ViewChild('filesEle') filesEle!: ElementRef;
  @ViewChild('textValEle') textValEle!: ElementRef;
  @ViewChild('talkSendMoreEle') talkSendMoreEle!: ElementRef;

  constructor(
    private clientManSvc: ClientManagerService,
    private inviteFrendsService: InviteFrendsService,
    public messageManSvc: MessageManagerService,
    private chattingSvc: ChattingService,
    public channelManSvc: ChannelManagerService,) { }

  ngOnInit(): void {
  }
  fileAttachDelete() {
    if(this.filesEle === undefined) {
      return;
    }
    this.hasAttachment = false;
    this.filesEle.nativeElement.value = '';
  }
  getFileAttachName() {
    if(this.hasAttachment === false) {
      return;
    }
    return this.filesEle.nativeElement.value;
  }

  clearChattingInput() {
    this.fileAttachDelete();
    this.textValEle.nativeElement.value = '';
    this.chattingSvc.moveScrollDown();
  }

  async sendMessage(text: string | null) {
    debugger;
    if(text === null || text === "") {
      return;
    }
    const files = this.filesEle.nativeElement.files;
    const nc = this.channelManSvc.selectChannel;
    await this.messageManSvc.sendMessagePorc(nc, text, files[0]);
    this.hasAttachment = false;
    this.clearChattingInput();
  }

  fileChanges() {
    const file = this.filesEle.nativeElement.files[0];
    if(file.type !== 'image/jpeg') {
      alert('이미지가 아닌 파일은 전송할 수 없습니다');
      this.filesEle.nativeElement.value = '';
      this.hasAttachment = false;
      return;
    } else {
      this.hasAttachment = true;
    }
  }


  onSendMore() {
    const talkSendMore = this.talkSendMoreEle.nativeElement;
    if( $(talkSendMore).parent().hasClass("open")){
      $(talkSendMore).next("ul").stop().slideUp();
      $(talkSendMore).parent().removeClass("open");
    }else{
      $(talkSendMore).next("ul").stop().slideDown();
      $(talkSendMore).parent().addClass("open");
    }

  }

  getOut() {
    this.chattingSvc.changeChattingUI.emit(ChattingUI.듀플친구들);
    alert('퍼블리싱이 안되었다리~');
  }

  async inviteFrend() {
    this.chattingSvc.changeChattingUI.emit(ChattingUI.친구초대);
    $('.chating_widget_chat', document).removeClass('chating_room_iframe_wrap');
    await this.inviteFrendsService.initFrendsByHttp(this.user);
  }
}
