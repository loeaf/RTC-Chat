import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaRoomUsersComponent } from './meta-room-users.component';



@NgModule({
  declarations: [
    MetaRoomUsersComponent
  ],
  exports: [
    MetaRoomUsersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MetaRoomUsersModule { }
