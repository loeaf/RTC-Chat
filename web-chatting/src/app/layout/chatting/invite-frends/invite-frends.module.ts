import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteFrendsComponent } from './invite-frends.component';



@NgModule({
  declarations: [
    InviteFrendsComponent
  ],
  exports: [
    InviteFrendsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InviteFrendsModule { }
