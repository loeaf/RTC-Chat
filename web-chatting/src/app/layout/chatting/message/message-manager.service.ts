import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageManagerService {
  messages: any[] = [];

  constructor() { }
  async getMessageByChannel(selectChannel: any) {
    const watch = await selectChannel.watch();
    this.messages = watch.messages;
    return watch.messages;
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
      console.log(JSON.stringify(event));
      this.messages.push(event.message)
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
