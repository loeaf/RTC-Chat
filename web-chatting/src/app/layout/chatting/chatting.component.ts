import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ChattingHttpService, ChattingStep, Room, User} from '../../chatting-http.service';
import {Channel} from 'stream-chat';
import {
  AttachmentListContext,
  AttachmentPreviewListContext,
  AvatarContext,
  ChannelActionsContext,
  ChannelPreviewContext,
  ChannelService,
  ChatClientService,
  CommandAutocompleteListItemContext,
  CustomTemplatesService, DefaultStreamChatGenerics,
  EmojiPickerContext,
  IconContext,
  LoadingIndicatorContext,
  MentionAutcompleteListItemContext,
  MentionTemplateContext, MessageActionBoxItemContext, MessageActionsBoxContext,
  MessageContext,
  MessageInputContext, MessageReactionsContext, ModalContext, NotificationContext,
  StreamI18nService, StreamMessage, ThreadHeaderContext,
  TypingIndicatorContext
} from 'stream-chat-angular';
const PhraseGen = require('korean-random-words');
import * as uuid from "uuid";
import {ActivatedRoute} from '@angular/router';
const StreamChat = require('stream-chat').StreamChat;
const client = StreamChat.getInstance("dz5f4d5kzrue");

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  @ViewChild('a', { static: true }) messageTemplate!: TemplateRef<MessageContext>;
  @ViewChild('b', { static: true }) channelPreviewTemplate!: TemplateRef<ChannelPreviewContext>;
  @ViewChild('threadHeaderTemplate', { static: true }) threadHeaderTemplate!: TemplateRef<ThreadHeaderContext>;
  client: any;
  nowChannel: any;
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
    this.nowChannel = await this.createMyRoom();
    // await this.initChannel();
    // await this.createRoom();
    // await this.renderRoom();
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
    const channel = client.channel('messaging', 'the-small-council_GgqVqKNM1R', {
      name: "Private Chat About the Kingdom",
      image: "https://bit.ly/2F3KEoM",
      members: [this.user?.id],
      session: 8 // custom field, you can add as many as you want
    });

    const _channel = await channel.watch();
    if(_channel === undefined) {
      alert('room not found');
    } else {
      // alert('room generate');
    }
    return _channel;
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
  async initChannel() {
    if(this.roomsList === undefined) {
      return;
    }
    this.channelList = [];
    for (const room of this.roomsList) {
      const channel = this.createMessageChannel(room.id, room.ownerId, room.roomName);
      this.channelList.push(channel);
    }
  }
  createMessageChannel(roomdId: string, userSub: string, roomName: string) {
    const channel = this.chatService.chatClient.channel('messaging', roomdId, {
      name: roomName,
      owner: userSub
    });
    return channel;
  }
  async createRoom() {
    if(this.channelList === undefined) {
      return;
    }
    for (const channelListElement of this.channelList) {
      await channelListElement.create();
    }
  }
  async renderRoom() {
    if(this.roomsList === undefined) {
      return;
    }
    const roomsId = this.roomsList.map(obj => obj.id);
    this.channelService.init({
      type: 'messaging',
      id: { $in: roomsId }
      // members: { $in: roomsId }
    });
  }
  async destroyRoomAll() {
    if(this.channelList === undefined) {
      return;
    }
    for (const channelListElement of this.channelList) {
      channelListElement.delete();
    }
  }
  ngAfterViewInit(): void {
    this.customTemplatesService.messageTemplate$.next(this.messageTemplate);
    this.customTemplatesService.channelPreviewTemplate$.next(this.channelPreviewTemplate);
    this.customTemplatesService.threadHeaderTemplate$.next(this.threadHeaderTemplate);
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
    return this.nowChannel.channel.name;
  }
}
