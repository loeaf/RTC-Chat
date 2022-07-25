import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingComponent } from './chatting.component';
import {StreamAutocompleteTextareaModule, StreamChatModule} from 'stream-chat-angular';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {InviteFrendsModule} from './invite-frends/invite-frends.module';
import {MetaRoomUsersModule} from './meta-room-users/meta-room-users.module';



@NgModule({
  declarations: [
    ChattingComponent,
  ],
  imports: [CommonModule, BrowserModule, StreamAutocompleteTextareaModule,
    StreamChatModule, HttpClientModule, RouterModule, TranslateModule, InviteFrendsModule, MetaRoomUsersModule
  ],
  exports: [
    ChattingComponent,
  ]
})
export class ChattingModule { }
