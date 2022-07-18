import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  AttachmentListContext,
  AttachmentPreviewListContext,
  AvatarContext,
  ChannelActionsContext,
  ChannelPreviewContext,
  ChannelService,
  ChatClientService,
  CommandAutocompleteListItemContext,
  CustomTemplatesService,
  DefaultStreamChatGenerics,
  EmojiPickerContext,
  IconContext,
  LoadingIndicatorContext,
  MentionAutcompleteListItemContext,
  MentionTemplateContext, MessageActionBoxItemContext, MessageActionsBoxContext,
  MessageContext,
  MessageInputContext, MessageReactionsContext, ModalContext, NotificationContext,
  StreamI18nService,
  StreamMessage, ThreadHeaderContext,
  TypingIndicatorContext
} from "stream-chat-angular";
import { ChattingHttpService, ChattingStep, Room, User } from "./chatting-http.service";
import { Channel } from "stream-chat";
import * as uuid from "uuid";
const PhraseGen = require('korean-random-words');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('a', { static: true }) messageTemplate!: TemplateRef<MessageContext>;
  @ViewChild('b', { static: true }) channelPreviewTemplate!: TemplateRef<ChannelPreviewContext>;
  @ViewChild('mentionAutocompleteItemTemplate')
  private mentionAutocompleteItemTemplate!: TemplateRef<MentionAutcompleteListItemContext>;
  @ViewChild('commandAutocompleteItemTemplate')
  private commandAutocompleteItemTemplate!: TemplateRef<CommandAutocompleteListItemContext>;
  @ViewChild('customMessageInputTemplate')
  private customMessageInputTemplate!: TemplateRef<MessageInputContext>;
  @ViewChild('mentionTemplate')
  private mentionTemplate!: TemplateRef<MentionTemplateContext>;
  @ViewChild('emojiPickerTemplate')
  private emojiPickerTemplate!: TemplateRef<EmojiPickerContext>;
  @ViewChild('typingIndicator')
  private typingIndicatorTemplate!: TemplateRef<TypingIndicatorContext>;
  @ViewChild('channelActionsTemplate')
  private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;
  @ViewChild('attachmentListTemplate')
  private attachmentListTemplate!: TemplateRef<AttachmentListContext>;
  @ViewChild('attachmentPreviewListTemplate')
  private attachmentPreviewListTemplate!: TemplateRef<AttachmentPreviewListContext>;
  @ViewChild('avatarTemplate')
  private avatarTemplate!: TemplateRef<AvatarContext>;
  @ViewChild('iconTemplate')
  private iconTemplate!: TemplateRef<IconContext>;
  @ViewChild('loadingIndicatorTemplate')
  private loadingIndicatorTemplate!: TemplateRef<LoadingIndicatorContext>;
  @ViewChild('messageActionsBoxTemplate')
  private messageActionsBoxTemplate!: TemplateRef<MessageActionsBoxContext>;
  @ViewChild('messageActionItemTemplate')
  private messageActionItemTemplate!: TemplateRef<MessageActionBoxItemContext>;
  @ViewChild('messageReactionsTemplate')
  private messageReactionsTemplate!: TemplateRef<MessageReactionsContext>;
  @ViewChild('modalTemplate')
  private modalTemplate!: TemplateRef<ModalContext>;
  @ViewChild('notificationTemplate')
  private notificationTemplate!: TemplateRef<NotificationContext>;
  @ViewChild('threadHeaderTemplate')
  private threadHeaderTemplate!: TemplateRef<ThreadHeaderContext>;

  private channelList?: Array<Channel<DefaultStreamChatGenerics>> = [];
  private roomsList?: Array<Room> = [];
  chattingStep: ChattingStep = ChattingStep.로그인필요;
  user?: User;
  uuid: any;
  @Input() message!: StreamMessage;
  hasAttachment!: boolean;
  hiddenProp1: boolean = false;
  hiddenProp2: boolean = true;

  constructor(
    private chatService: ChatClientService,
    public channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService,
    private chattingHttpService: ChattingHttpService,
  ) {
  }

  async ngOnInit() {
  }
  async afterLogin() {
    await this.initUser();
    await this.createMyRoom();
    await this.initChannel();
    await this.createRoom();
    await this.renderRoom();
  }
  async initUser() {
    const apiKey = 'dhefjeuw9yg5';
    const userId = 'vaiv';
    // const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmFpdiJ9.oG0aZEdPN-oZWvI8kq1IOmnB98mOrdu4GiTGUapVvX4';
    // debugger;
    const userToken = await this.chattingHttpService.getTokenById(userId);
    debugger;
    this.chatService.init(apiKey, userId, userToken.token);
    this.streamI18nService.setTranslation();
  }
  async createMyRoom() {
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
  login(value: string) {
    // 아이디가 없다면 새로 만들기
    if (value === "") {
      const user = {
        id: uuid.v4(),
        nickName: new PhraseGen().generatePhrase()
      };
      this.chattingHttpService.postUser(user).then(p => {
        this.user = p;
        this.loginAlert();
        this.chattingStep = ChattingStep.챗팅이용;
        this.hiddenProp1 = true;
        this.hiddenProp2 = false;
        this.afterLogin();
      });
    } else {
      // 아이디가 있다면 가져와 셋팅
      this.chattingHttpService.getUser({
        id: value
      }).then(p => {
        if (p === undefined) {
          return;
        }
        if (p.length === 0) {
          alert('아이디가 틀렸습니다. 공백으로 넣으주시면 아이디가 생성됩니다');
        }
        this.user = p[0];
        this.loginAlert();
        alert('로그인되었습니다');
        this.chattingStep = ChattingStep.챗팅이용;
        this.hiddenProp1 = true;
        this.hiddenProp2 = false;
        this.afterLogin();
      });
    }
  }
  loginAlert() {
    if(this.user === undefined) {
      return;
    }
    alert(`당신의 JWT 값은 ${this.user.id} 입니다. 닉네임은 : ${this.user.nickName}`);
  }
  ngAfterViewInit(): void {
    this.customTemplatesService.messageTemplate$.next(this.messageTemplate);
    this.customTemplatesService.channelPreviewTemplate$.next(this.channelPreviewTemplate);
    // this.customTemplatesService.mentionAutocompleteItemTemplate$.next(
    //   this.mentionAutocompleteItemTemplate
    // );
    // this.customTemplatesService.commandAutocompleteItemTemplate$.next(
    //   this.commandAutocompleteItemTemplate
    // );
    // this.customTemplatesService.messageInputTemplate$.next(
    //   this.customMessageInputTemplate
    // );
    // this.customTemplatesService.mentionTemplate$.next(this.mentionTemplate);
    // this.customTemplatesService.emojiPickerTemplate$.next(
    //   this.emojiPickerTemplate
    // );
    // this.customTemplatesService.typingIndicatorTemplate$.next(
    //   this.typingIndicatorTemplate
    // );
    // this.customTemplatesService.channelActionsTemplate$.next(
    //   this.channelActionsTemplate
    // );
    // this.customTemplatesService.attachmentListTemplate$.next(
    //   this.attachmentListTemplate
    // );
    // this.customTemplatesService.attachmentPreviewListTemplate$.next(
    //   this.attachmentPreviewListTemplate
    // );
    // this.customTemplatesService.avatarTemplate$.next(this.avatarTemplate);
    // this.customTemplatesService.iconTemplate$.next(this.iconTemplate);
    // this.customTemplatesService.loadingIndicatorTemplate$.next(
    //   this.loadingIndicatorTemplate
    // );
    // this.customTemplatesService.messageActionsBoxTemplate$.next(
    //   this.messageActionsBoxTemplate
    // );
    // this.customTemplatesService.messageActionsBoxItemTemplate$.next(
    //   this.messageActionItemTemplate
    // );
    // // this.customTemplatesService.messageReactionsTemplate$.next(
    // //   this.messageReactonsTemplate
    // // );
    // this.customTemplatesService.modalTemplate$.next(this.modalTemplate);
    // this.customTemplatesService.notificationTemplate$.next(
    //   this.notificationTemplate
    // );
    // this.customTemplatesService.threadHeaderTemplate$.next(
    //   this.threadHeaderTemplate
    // );
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
}
