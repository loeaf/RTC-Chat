import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {ChattingHttpService, ChattingStep, Room, User} from '../../chatting-http.service';
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
const StreamChat = require('stream-chat').StreamChat;
const client = StreamChat.getInstance("dz5f4d5kzrue");

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
  nowChannel: any;
  channels: any[] = [];
  channelMembers: any[] = [];
  messages: any[] = [];
  private channelList?: Array<Channel<DefaultStreamChatGenerics>> = [];
  private roomsList?: Array<Room> = [];
  chattingStep: ChattingStep = ChattingStep.로그인필요;
  user?: User;
  uuid: any;
  @Input() message!: StreamMessage;
  hasAttachment!: boolean;

  constructor(
    private route: ActivatedRoute,
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
    this.client = await this.initUser();
    // this.nowChannel = await this.createMyRoom();
    this.channels = await this.getChannelByUser();
    this.initStreamChat(0);
  }

  async initStreamChat(num: number) {
    await this.setNowChannel(num);
    await this.getChannelMembers(this.nowChannel);
    await this.getMessageByRoom();
    await this.messageEvent();
  }
  async setNowChannel(num: number) {
    this.nowChannel = this.channels[num];
  }

  async getMessageByRoom() {
    const objWatch = await this.nowChannel.watch();
    this.messages = objWatch.messages;
    debugger;
  }

  async getChannelByUser() {
    if(this.user === undefined) {
      return;
    }
    const filter = { type: 'messaging', members: { $in: [this.user.id] } };
    const sort = { last_message_at: -1 };

    const channels = await client.queryChannels(filter, sort, {watch:true});
    debugger;
    if(channels.length === 0) {
      console.log('channel 이 없다...?')
    }
    return channels;
  }

  async initUser() {
    if (this.user === undefined) {
      return;
    }
    const userToken = await this.chattingHttpService.getTokenById(this.user?.id);
    const _client = await client.connectUser({
      id: this.user?.id,
      name: this.user?.nickName,
    }, userToken.token); // token generated server side
    if(_client === undefined) {
      alert('client not found');
    } else {
      // alert('connection client');
    }
    return _client;
  }
  async createMyRoom() {
    const channel = client.channel('messaging', uuid.v4(), {
      name: new PhraseGen().getAdjective("-ROOM"),
      image: "https://bit.ly/2F3KEoM",
      members: [this.user?.id],
      session: 8 // custom field, you can add as many as you want
    });

    const _channel = await channel.watch();
    debugger;
    if(_channel === undefined) {
      alert('room not found');
    } else {
      // alert('room generate');
    }
    return _channel;
  }
  async getChannelMembers(channel: any) {
    const channelMembers = await channel.queryMembers({});
    this.channelMembers = channelMembers.members;
    debugger;
    console.log(`now channelMembers : ${this.channelMembers}`);
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
    const channel = this.nowChannel;
    if(text === null) {
      return;
    }
    const attach = this.filesEle.nativeElement;

    const files = this.filesEle.nativeElement.files;
    const response = await channel.sendImage(files[0]);
    debugger;
    // const base64 = await this.convertBase64ByFile(attach);
    const p = {
      type: 'image',
      asset_url: response.file,
      thumb_url: response.file,
      myCustomField: 123
    }
    const message = await this.nowChannel.sendMessage({
      text,
      attachments: [p]
    });
    this.message = message.message;
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
    debugger;;
    if (ss === this.chattingStep) {
      return true;
    } else {
      return false;
    }
  }

  setChannelName() {
    if(this.nowChannel === undefined) {
      return;
    }
    return this.nowChannel.data.name;
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
    this.nowChannel.on("message.new", (event: any) => {
      console.log(JSON.stringify(event));
      this.messages.push(event.message)
      debugger;
    });
  }

  setActiveRoom($event: MouseEvent, i: number) {
    const target = $event.target;
    const chattingRoomEle: any = this.chattingRoomEle;
    chattingRoomEle.forEach((p: any) => {
      $(p.nativeElement).removeClass('active')
    });
    const selectEle: any = this.chattingRoomEle.filter((element, index) => index === i);
    $(selectEle[0].nativeElement).addClass('active')
    debugger;
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
    }
    if (this.filesEle.nativeElement.value === '') {
      return false;
    } else {
      return true;
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
}
