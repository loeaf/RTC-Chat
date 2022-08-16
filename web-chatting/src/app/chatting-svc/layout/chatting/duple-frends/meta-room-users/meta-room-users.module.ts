import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaRoomUsersComponent } from './meta-room-users.component';
import {InviteChattingModule} from '../../component/invite-chatting/invite-chatting.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';



@NgModule({
  declarations: [
    MetaRoomUsersComponent
  ],
  exports: [
    MetaRoomUsersComponent
  ],
  imports: [
    CommonModule,
    InviteChattingModule
  ]
})
export class MetaRoomUsersModule { }
