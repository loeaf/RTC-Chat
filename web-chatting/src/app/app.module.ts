import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ChattingModule} from './layout/chatting/chatting.module';
import {LoginModule} from './layout/login/login.module';
import {AppRoutingModule} from './app-routing.module';
import {MainModule} from './layout/main/main.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, TranslateModule.forRoot(),
    RouterModule, ChattingModule, MainModule, LoginModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
