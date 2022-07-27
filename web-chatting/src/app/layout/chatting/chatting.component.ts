import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ChattingHttpService, ChattingStep, Room} from './chatting/chatting-http.service';
import {Channel} from 'stream-chat';
import {
  ChannelService,
  ChatClientService,
  CustomTemplatesService,
  DefaultStreamChatGenerics,
  StreamI18nService,
} from 'stream-chat-angular';
import * as uuid from "uuid";
import {ActivatedRoute} from '@angular/router';
import {ClientManagerService} from './user/client-manager.service';
import {ChannelManagerService} from './channel/channel-manager.service';
import {MessageManagerService} from './message/message-manager.service';
import {saveAs} from 'file-saver';
import {User} from './user/user-http.service';
import {FrendAcceptPopupService} from './component/popup/frend-accept-popup/frend-accept-popup.service';
import {PopupType} from './component/popup/popup-manager.service';
import {FrendAcceptPopupHttpService} from './component/popup/frend-accept-popup/frend-accept-popup-http.service';
import {Frend} from './invite-frends/frend-http.service';
import {UserService} from './user/user.service';

const PhraseGen = require('korean-random-words');
declare const $: any;

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollboxEle') scrollboxEle!: ElementRef;
  @ViewChildren('chattingRoomEle') chattingRoomEle!: ElementRef[];
  client: any;
  private channelList?: Array<Channel<DefaultStreamChatGenerics>> = [];
  private roomsList?: Array<Room> = [];
  chattingStep: ChattingStep = ChattingStep.로그인필요;
  user?: User;
  uuid: any;
  hasAttachment: boolean = false;
  selectChannelFn: any = null;
  userAddFn: any = null;
  userUpdateFn: any = null;
  userDeleteFn: any = null;


  constructor(
    private route: ActivatedRoute,
    private clientManSvc: ClientManagerService,
    public messageManSvc: MessageManagerService,
    public channelManSvc: ChannelManagerService,
    private chatService: ChatClientService,
    public channelService: ChannelService,
    public frendAcceptPopupSvc: FrendAcceptPopupService,
    public frendAcceptPopupHttpService: FrendAcceptPopupHttpService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService,
    private chattingHttpService: ChattingHttpService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.route.snapshot.queryParams['user']);
    UserService.user = this.user;
    this.afterLogin();
  }
  async afterLogin() {
    this.client = await this.clientManSvc.createClient(this.user);
    // await this.channelManSvc.findChannelById(this.user.id);
    // await this.changeChannel(0);
    this.channelManSvc.changeChannelEvt.subscribe(p => {
      this.changeChannel(p);
    })
    await this.initFecoFrendsToMe();
  }

  // 나를 추가한 친구 목록 초기화 및 1회 가시화
  async initFecoFrendsToMe() {
    const frendsList = await this.frendAcceptPopupHttpService.getRecoFrendsToMe(this.user.id);
    this.frendAcceptPopupSvc.frendsAcceptListQue = frendsList.frends;
    if(frendsList.frends.length > 0) {
      const o = this.frendAcceptPopupSvc.frendsAcceptListQue.shift();
      this.frendAcceptPopupSvc.frendRecProcPopUp(o, PopupType.친구승인);
    }
  }

  async changeChannel(index: number) {
    await this.channelManSvc.initSelectChannel(index);
    const sel = this.channelManSvc.selectChannel;
    await this.channelManSvc.initMembersByChannel(sel);
    await this.messageManSvc.getMessageByChannel(this.channelManSvc.selectChannel);
    if(this.selectChannelFn !== null) {
      this.selectChannelFn.unsubscribe();
    }
    this.selectChannelFn = this.messageManSvc.listenMessage(this.channelManSvc.selectChannel);
    if(this.userAddFn !== null) {
      this.userAddFn.unsubscribe();
    }
    this.userAddFn = this.clientManSvc.listenAddMember(this.channelManSvc.selectChannel);
    if(this.userDeleteFn !== null) {
      this.userDeleteFn.unsubscribe();
    }
    this.userDeleteFn = this.clientManSvc.listenRemoveMember(this.channelManSvc.selectChannel);
    if(this.userUpdateFn !== null) {
      this.userUpdateFn.unsubscribe();
    }
    this.userUpdateFn = this.clientManSvc.listenUpdateMember(this.channelManSvc.selectChannel);
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
    this.channelManSvc.changeChannelEvt.emit(i);
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
  downloadImage(url: string, name: string) {
    if(name === undefined) {
      name = uuid.v4();
    }
    saveAs(url, name+'.png');
  }
}
