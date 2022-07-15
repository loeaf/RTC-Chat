import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { MessageComponent } from './message/message.component';
import { ChannelPreviewComponent } from './channel-preview/channel-preview.component';
import {IconComponent} from './icon/icon.component';
import {MessageActionComponent} from './message-action/message-action.component';
import {ThreadHeaderComponent} from './thread-header/thread-header.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,
    IconComponent,
    MessageActionComponent,
    ThreadHeaderComponent,
    MessageComponent,
    ChannelPreviewComponent],
  imports: [BrowserModule, TranslateModule.forRoot(), StreamAutocompleteTextareaModule, StreamChatModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
