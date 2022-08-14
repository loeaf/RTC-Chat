import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveRoomPopupComponent } from './move-room-popup.component';



@NgModule({
  declarations: [
    MoveRoomPopupComponent
  ],
  exports: [
    MoveRoomPopupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MoveRoomPopupModule { }
