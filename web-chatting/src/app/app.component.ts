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
import { ChattingHttpService, ChattingStep, Room, User } from "./layout/chatting/chatting-http.service";
import { Channel } from "stream-chat";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(
  ) {
  }

  async ngOnInit() {
  }
}
