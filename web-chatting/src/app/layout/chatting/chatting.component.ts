import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {ChattingHttpService, ChattingStep, Room, User} from './http-service/chatting-http.service';
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
    const { myChannel, otherChannel } = await this.channelManSvc.findChannelById(this.user.id);
    const owner = await this.channelManSvc.getMembersByChannel(this.channelManSvc.myChannel);
    await this.channelManSvc.initSelectChannel(0);
    await this.messageManSvc.getMessageByChannel(this.channelManSvc.selectChannel);
    this.messageManSvc.listenMessage(this.channelManSvc.selectChannel);
  }

  async initStreamChat(num: number) {
    // await this.getChannelMembers(this.nowChannel);
  }

  async createMyRoom2() {
    if(this.user === undefined) {
      return;
    }
    // 내방이 있는지 확인 (내방은 default로 존재)
    const resultRoom = await this.chattingHttpService.getRooms({id: this.user.id});
    if (resultRoom === undefined) {
      return;
    }
    if (resultRoom.length === 0) {
      const room: Room = {
        id: uuid.v4(),
        ownerId: this.user.id,
        roomName: new PhraseGen().generatePhrase()
      };
      await this.chattingHttpService.postRooms(room);
    }
    // 전체 리스트 가지고 와서 초기화
    this.roomsList = await this.chattingHttpService.getRoomsAll();
  }
  createMessageChannel(roomdId: string, userSub: string, roomName: string) {
    const channel = this.chatService.chatClient.channel('messaging', roomdId, {
      name: roomName,
      owner: userSub
    });
    return channel;
  }
  async destroyRoomAll() {
    if(this.channelList === undefined) {
      return;
    }
    for (const channelListElement of this.channelList) {
      channelListElement.delete();
    }
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
  inviteClicked(channel: Channel) {
    alert(
      `You can add channel actions to the channel header to manage the ${
        channel.data?.name || (channel.data?.id as string)
      } channel`
    );
  }

  hidden(ss: ChattingStep) {
    if (ss === this.chattingStep) {
      return true;
    } else {
      return false;
    }
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
    this.initStreamChat(i);

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
