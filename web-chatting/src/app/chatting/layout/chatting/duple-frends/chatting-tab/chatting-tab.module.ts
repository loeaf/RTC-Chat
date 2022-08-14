import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingTabComponent } from './chatting-tab.component';
import {AngularRippleModule} from 'angular-ripple-effect-lib';



@NgModule({
  declarations: [
    ChattingTabComponent
  ],
  exports: [
    ChattingTabComponent
  ],
  imports: [
    CommonModule,
    AngularRippleModule
  ]
})
export class ChattingTabModule { }
