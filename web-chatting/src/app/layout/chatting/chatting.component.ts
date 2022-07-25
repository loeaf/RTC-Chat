import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {ChattingHttpService, ChattingStep, Room, User} from './chatting/chatting-http.service';
import {Channel} from 'stream-chat';
import {
  ChannelPreviewContext,
  ChannelService,
  ChatClientService,
  CustomTemplatesService, DefaultStreamChatGenerics,
  MessageContext,
  StreamI18nService, StreamMessage, ThreadHeaderContext,
} from 'stream-chat-angular';
const PhraseGen = require('korean-random-words');
import * as uuid from "uuid";
import {ActivatedRoute} from '@angular/router';
import {ClientManagerService} from './service/client-manager.service';
import {ChannelManagerService} from './service/channel-manager.service';
import {AttachFileDto, MessageManagerService} from './service/message-manager.service';
import { saveAs } from 'file-saver';
declare const $: any;

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit, AfterViewInit {
  @ViewChild('filesEle') filesEle!: ElementRef;
  @ViewChild('textValEle') textValEle!: ElementRef;
  @ViewChildren('chattingRoomEle') chattingRoomEle!: ElementRef[];
  client: any;
  private channelList?: Array<Channel<DefaultStreamChatGenerics>> = [];
  private roomsList?: Array<Room> = [];
  chattingStep: ChattingStep = ChattingStep.로그인필요;
  user?: User;
  uuid: any;
  hasAttachment!: boolean;
  selectChannelFn: any = null;


  constructor(
    private route: ActivatedRoute,
    private clientManSvc: ClientManagerService,
    public messageManSvc: MessageManagerService,
    public channelManSvc: ChannelManagerService,
    private chatService: ChatClientService,
    public channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService,
    private chattingHttpService: ChattingHttpService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.route.snapshot.queryParams['user']);
    this.afterLogin();
  }
  async afterLogin() {
    this.client = await this.clientManSvc.createClient(this.user.id);
    await this.channelManSvc.findChannelById(this.user.id);
    await this.changeChannel(0);
  }

  async changeChannel(index: number) {
    await this.channelManSvc.initSelectChannel(index);
    await this.channelManSvc.getMembersByChannel(this.channelManSvc.selectChannel);
    await this.messageManSvc.getMessageByChannel(this.channelManSvc.selectChannel);
    if(this.selectChannelFn !== null) {
      this.selectChannelFn.unsubscribe();
    }
    this.selectChannelFn = this.messageManSvc.listenMessage(this.channelManSvc.selectChannel);
  }
  async sendMessage(text: string | null) {
    if(text === null) {
      return;
    }
    const files = this.filesEle.nativeElement.files;
    const nc = this.channelManSvc.selectChannel;
    await this.messageManSvc.sendMessagePorc(nc, text, files[0]);
    this.clearChattingInput();
  }
  ngAfterViewInit(): void {
  }
  setSelectCls(num: number) {
    if (num === 0) {
      return 'active';
    } else {
      return '';
    }
  }
  setProfileImg(user: any) {
    const imageUrl = user.image;
    const image = './assets/my_profile.png';
    if(imageUrl === undefined) {
      return { 'background-image': `url(${image})` }
    } else if (imageUrl.search('https') === -1) {
      return { 'background-image': `url(${image})` }
    }
    return { 'background-image': `url(${imageUrl})` }
  }

  async channelClick(i: number) {
    await this.changeChannel(i);
  }
  async messageEvent() {
    debugger;
  }

  setActiveRoom($event: MouseEvent, i: number) {
    const target = $event.target;
    const chattingRoomEle: any = this.chattingRoomEle;
    chattingRoomEle.forEach((p: any) => {
      $(p.nativeElement).removeClass('active')
    });
    const selectEle: any = this.chattingRoomEle.filter((element, index) => index === i);
    $(selectEle[0].nativeElement).addClass('active')
  }

  fileChanges() {
    const file = this.filesEle.nativeElement.files[0];
    if(file.type !== 'image/jpeg') {
      alert('이미지가 아닌 파일은 전송할 수 없습니다');
      this.filesEle.nativeElement.value = '';
      return;
    }
  }

  visibleFileAttach() {
    if(this.filesEle === undefined) {
      return;
    } else {
      if (this.filesEle.nativeElement.value === '') {
        return false;
      } else {
        return true;
      }
    }
  }

  getFileAttachName() {
    if(this.filesEle === undefined) {
      return;
    }
    return this.filesEle.nativeElement.value;
  }

  fileAttachDelete() {
    if(this.filesEle === undefined) {
      return;
    }
    this.filesEle.nativeElement.value = '';
  }

  clearChattingInput() {
    this.fileAttachDelete();
    this.textValEle.nativeElement.value = '';
  }

  convertBase64ByFile(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  downloadImage(url: string, name: string) {
    saveAs(url, name+'.png');
  }
}
