import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrendListComponent } from './frend-list.component';
import {InviteChattingModule} from '../../component/invite-chatting/invite-chatting.module';



@NgModule({
  declarations: [
    FrendListComponent
  ],
  exports: [
    FrendListComponent
  ],
  imports: [
    CommonModule,
    InviteChattingModule
  ]
})
export class FrendListModule { }
