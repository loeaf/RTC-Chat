import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalkSendBoxComponent } from './talk-send-box.component';



@NgModule({
  declarations: [
    TalkSendBoxComponent
  ],
  exports: [
    TalkSendBoxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TalkSendBoxModule { }
