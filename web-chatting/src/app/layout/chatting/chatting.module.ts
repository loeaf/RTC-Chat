import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingComponent } from './chatting.component';
import {StreamAutocompleteTextareaModule, StreamChatModule} from 'stream-chat-angular';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {InviteFrendsModule} from './invite-frends/invite-frends.module';
import {MetaRoomUsersModule} from './duple-frends/meta-room-users/meta-room-users.module';
import {FrendListModule} from './duple-frends/frend-list/frend-list.module';
import {ChattingTabModule} from './duple-frends/chatting-tab/chatting-tab.module';



@NgModule({
  declarations: [
    ChattingComponent,
  ],
  imports: [CommonModule, BrowserModule, StreamAutocompleteTextareaModule,
    StreamChatModule, HttpClientModule, RouterModule, TranslateModule, InviteFrendsModule, MetaRoomUsersModule, FrendListModule, ChattingTabModule
  ],
  exports: [
    ChattingComponent,
  ]
})
export class ChattingModule { }
