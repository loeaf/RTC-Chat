import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingTabComponent } from './chatting-tab.component';



@NgModule({
  declarations: [
    ChattingTabComponent
  ],
  exports: [
    ChattingTabComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChattingTabModule { }
