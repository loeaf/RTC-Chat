import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {ChattingModule} from '../chatting/chatting.module';



@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        ChattingModule
    ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
