import { Injectable } from '@angular/core';
import {ChattingService} from '../chatting/chatting.service';
import {ChannelService} from 'stream-chat-angular';
import {ChannelManagerService} from '../channel/channel-manager.service';

@Injectable({
  providedIn: 'root'
})
export class MessageManagerService {
  messages: any[] = [];

  constructor(private channelManagerService: ChannelManagerService) { }
  async getMessageByChannel(selectChannel: any) {
    const watch = await selectChannel.watch();
    this.messages = watch.messages;
    return this.messages;
  }

  async sendMessagePorc(selectChannel: any, text: string, file: any) {
    if(file === undefined) {
      await this.sendMessage(selectChannel, {
        text: text
      });
    } else {
      const response = await selectChannel.sendImage(file);
      const p: AttachFileDto = {
        type: 'image',
        asset_url: response.file,
        thumb_url: response.file,
        image_name: file.name
      }
      await this.sendMessage(selectChannel, {
        text: text,
        attachFile: [p]
      });
    }
  }
  private async sendMessage(selectChannel: any, messageDto: MessageDto) {
    await selectChannel.sendMessage(messageDto);
  }

  listenMessage(selectChannel: any) {
    return selectChannel.on("message.new", (event: any) => {
      this.messages.push(event.message)
    });
  }

  listenAddMember(selectChannel: any) {
    return selectChannel.on("member.added", async (event: any) => {
      this.messages.push(`${event.user.name}님 깨서 출근하셨습니다.`);
    });
  }

  listenRemoveMember(selectChannel: any) {
    return selectChannel.on("member.removed",async (event: any) => {
      this.messages.push(`${event.user.name}님 깨서 퇴근하셨습니다.`);
    });
  }

  listenUpdateMember(selectChannel: any) {
    return selectChannel.on("member.updated", (event: any) => {
      console.log(JSON.stringify(event));
      debugger;
      // this.messages.push(event.message)
    });
  }

  listenDeleteChannel(selectChannel: any) {
    return selectChannel.on("channel.deleted", (event: any) => {
      this.messages.push(`${event.user.name}님 깨서 퇴근하셨습니다.`);
    });
  }

  listenUpdateChannel(selectChannel: any) {
    return selectChannel.on("channel.updated", async (event: any) => {
      await this.channelManagerService.initChannelMamber(selectChannel);
    });
  }
}

export interface MessageDto {
  text: string;
  attachFile?: AttachFileDto[];
}

export interface AttachFileDto {
  type: string;
  asset_url: string;
  thumb_url: string;
  image_name: string;
}
