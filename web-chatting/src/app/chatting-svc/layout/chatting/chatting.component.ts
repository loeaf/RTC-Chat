import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {ChattingStep} from './chatting/chatting-http.service';
import * as uuid from "uuid";
import {ActivatedRoute} from '@angular/router';
import {ClientManagerService} from './user/client-manager.service';
import {ChannelManagerService} from './channel/channel-manager.service';
import {MessageManagerService} from './message/message-manager.service';
import {saveAs} from 'file-saver';
import {FrendAcceptPopupService} from './component/popup/frend-accept-popup/frend-accept-popup.service';
import {PopupManagerService, PopupType} from './component/popup/popup-manager.service';
import {FrendAcceptPopupHttpService} from './component/popup/frend-accept-popup/frend-accept-popup-http.service';
import {UserService} from './user/user.service';
import {AuthService} from '../../auth/auth.service';
import {ChattingService, ChattingUI} from './chatting/chatting.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {FrendListService} from './duple-frends/frend-list/frend-list.service';

const PhraseGen = require('korean-random-words');
declare const $: any;

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit, AfterViewInit {
  @ViewChildren('chattingRoomEle') chattingRoomEle!: ElementRef[];
  client: any;
  chattingStep: ChattingStep = ChattingStep.로그인필요;
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
    private frendListSvc: FrendListService,
    public frendAcceptPopupSvc: FrendAcceptPopupService,
    public frendAcceptPopupHttpService: FrendAcceptPopupHttpService,
    private chattingSvc: ChattingService,
    private spinner: NgxSpinnerService,
    public userSvc: UserService,
    public popupManSvc: PopupManagerService,
    private authSvc: AuthService) { }

  ngOnInit(): void {
    this.afterLogin();
    this.chattingSvc.changeChattingUI.subscribe(p => {
      $("#chating_wrap").removeClass("chating_room_open");
      $("#chating_wrap").removeClass("friend_list_open");
      $("#chating_wrap").removeClass("chating_invite_open");
      if(p === ChattingUI.듀플친구들) {
        $("#chating_wrap").addClass("friend_list_open");
      } else if (p === ChattingUI.챗팅방) {
        $("#chating_wrap").addClass("chating_room_open");
      } else if (p === ChattingUI.친구초대) {
        $("#chating_wrap").addClass("chating_invite_open");
      }
    })
  }
  async afterLogin() {
    await this.spinner.show();
    // this.user = JSON.parse(this.route.snapshot.queryParams['user']);
    this.client = await this.clientManSvc.createClient(this.userSvc.getUser());
    // await this.channelManSvc.findChannelById(this.user.id);
    // await this.changeChannel(0);
    this.channelManSvc.changeChannelEvt.subscribe(async p => {
      await this.spinner.show();
      await this.changeChannel(p);
      await this.spinner.hide();
    })
    await this.initFecoFrendsToMe();
    await this.spinner.hide();
  }

  // 나를 추가한 친구 목록 초기화 및 1회 가시화
  async initFecoFrendsToMe() {
    const frendsList = await this.frendAcceptPopupHttpService.getRecoFrendsToMe(this.userSvc.getUser().id);
    this.frendAcceptPopupSvc.frendsAcceptListQue = frendsList.frends;
    if(frendsList.frends.length > 0) {
      const o = this.frendAcceptPopupSvc.frendsAcceptListQue.shift();
      this.frendAcceptPopupSvc.frendRecProcPopUp(o, PopupType.친구승인);
    }
  }

  async changeChannel(index: number) {
    const sel = this.channelManSvc.initSelectChannel(index);
    // const sel = this.channelManSvc.selectChannel;
    await this.channelManSvc.initMembersByChannel(sel);
    await this.messageManSvc.getMessageByChannel(this.channelManSvc.selectChannel);
    this.setActiveRoom(index);
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

  channelClick(i: number) {
    this.channelManSvc.changeChannelEvt.emit(i);
    this.setActiveRoom(i);
    setTimeout(() => {
      this.chattingSvc.moveScrollDown()
    }, 1000);
  }
  async messageEvent() {
    debugger;
  }

  setActiveRoom(i: number) {
    const chattingRoomEle: any = this.chattingRoomEle;
    chattingRoomEle.forEach((p: any) => {
      $(p.nativeElement).removeClass('active')
    });
    const selectEle: any = this.chattingRoomEle.filter((element, index) => index === i);
    $(selectEle[0].nativeElement).addClass('active');
  }
  downloadImage(url: string, name: string) {
    if(name === undefined) {
      name = uuid.v4();
    }
    saveAs(url, name+'.png');
  }

  addFrend(user: string) {
    this.frendAcceptPopupSvc.frendRecProcPopUp({
      userId: this.userSvc.getUser().id,
      frendId: user
    }, PopupType.친구초대);
  }

  isMyFrends(user: any) {
    // 나를 제외한 다른 아이디를 본다면
    if (user.id !== this.userSvc.getUser().id) {
      const isFrend = this.frendListSvc.frends.frends.some(p => p.frendId === user.id);
      if(isFrend) {
        return false;
      } else {
        return true;
      }
      return true;
    } else {
      return false;
    }
  }

  async goOutChannel() {
    this.popupManSvc.openPopupEvt.emit(PopupType.챗팅방나가기);
  }
}
