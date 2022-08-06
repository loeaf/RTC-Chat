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
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularRippleModule } from 'angular-ripple-effect-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, TranslateModule.forRoot(),
    RouterModule, ChattingModule, MainModule, LoginModule, AppRoutingModule,
    BrowserAnimationsModule, NgxSpinnerModule, AngularRippleModule],
    providers: [],
    bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
