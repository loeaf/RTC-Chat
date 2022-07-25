import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteChattingComponent } from './invite-chatting.component';



@NgModule({
  declarations: [
    InviteChattingComponent
  ],
  exports: [
    InviteChattingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InviteChattingModule { }
