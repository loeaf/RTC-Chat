import { Injectable } from '@angular/core';
import {ClientManagerService} from './client-manager.service';
const PhraseGen = require('korean-random-words');
import * as uuid from "uuid";
var randomProfile = require('random-profile-generator');

@Injectable({
  providedIn: 'root'
})
export class ChannelManagerService {
  myChannel: any = null;
  otherChannel: any[] = [];
  allChannel: any[] = [];
  members: any[] = [];
  selectChannel: any;
  selectIndex: number = 0;


  constructor(private cliManSvc: ClientManagerService) { }

  public async initSelectChannel(index: number) {
    this.selectIndex = index;
    this.selectChannel = this.allChannel[index];
    return this.selectChannel;
  }

  /**
   * 내 개인 방이 있는지 확인하는 API
   * 있으면 채널 리턴
   * 없으면 null 리턴
   * @param userId
   */
  public async findChannelById(userId: string) {
    this.myChannel = null;
    this.otherChannel = [];
    this.allChannel = [];
    const filter = { type: 'messaging', members: { $in: [userId] } };
    const sort = { last_message_at: -1 };

    const channels = await this.cliManSvc.getClient().queryChannels(filter, sort, {watch:true});
    debugger;
    if(channels.length === 0) {
      console.log('channel 이 없다...?');
      return null;
    }
    // 나만 있는 방 체크
    // 방장이 나가면 방 없어짐. 즉 나만 있는 방 있으면 방을 만들필요가 없음
    for (const channel of channels) {
      const users = await this.getMembersByChannel(channel);
      if(users.members.length === 1) {
        this.myChannel = channel;
      } else {
        this.otherChannel.push(channel);
      }
      debugger;
    }
    // 내 방이 없으면 만들어야함.
    if (this.myChannel === null) {
      this.myChannel = await this.createChannel(userId);
    }
    this.initChannel();
    return {myChannel: this.myChannel, otherChannel: this.otherChannel};
  }
  private initChannel() {
    this.allChannel.push(this.myChannel);
    for (const channel of this.otherChannel) {
      this.allChannel.push(channel)
    }
  }
  public async removeChannel(channel: any) {
    return channel.delete();
  }
  public async getChannelMamber(selectChannel: any) {
    const selectChanMem = await selectChannel.queryMembers({});
    return selectChanMem.members;
  }

  public async createChannel(userId: string): Promise<any> {
    const roomId = this.genRoomId();
    const roomName = this.genRoomName();

    const nowChannel = await this.cliManSvc.getClient().channel('messaging', roomId, {
      name: roomName,
      image: randomProfile.avatar(),
      members: [userId],
      session: 30 // custom field, you can add as many as you want
    });
    if(nowChannel.id === undefined) {
      alert('cant generate room');
      return null;
    }
    return nowChannel;
  }

  public async getMembersByChannel(nowChannel: any): Promise<any> {
    const members = await nowChannel.watch();
    this.members = members.members;
    return members;
  }

  public genRoomName(): string {
    return new PhraseGen().getAdjective("-ROOM");
  }
  public genRoomId(): string {
    return uuid.v4();
  }
}
