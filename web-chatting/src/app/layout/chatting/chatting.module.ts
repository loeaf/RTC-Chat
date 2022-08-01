import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingComponent } from './chatting.component';
import {StreamAutocompleteTextareaModule, StreamChatModule} from 'stream-chat-angular';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {InviteFrendsModule} from './invite-frends/invite-frends.module';
import {MetaRoomUsersModule} from './duple-frends/meta-room-users/meta-room-users.module';
import {FrendListModule} from './duple-frends/frend-list/frend-list.module';
import {ChattingTabModule} from './duple-frends/chatting-tab/chatting-tab.module';
import {TalkSendBoxModule} from './talk-send-box/talk-send-box.module';
import {MoveRoomPopupModule} from './component/popup/move-room-popup/move-room-popup.module';
import {FrendAcceptPopupModule} from './component/popup/frend-accept-popup/frend-accept-popup.module';
import {HttpServiceInterceptor} from '../../interceptor/http-service.interceptor';



@NgModule({
  declarations: [
    ChattingComponent,
  ],
  imports: [CommonModule, BrowserModule, StreamAutocompleteTextareaModule,
    StreamChatModule, HttpClientModule, RouterModule, TranslateModule, InviteFrendsModule, MetaRoomUsersModule, FrendListModule, ChattingTabModule, TalkSendBoxModule, MoveRoomPopupModule, FrendAcceptPopupModule
  ],
  exports: [
    ChattingComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpServiceInterceptor,
      multi: true
    }
  ]
})
export class ChattingModule { }
