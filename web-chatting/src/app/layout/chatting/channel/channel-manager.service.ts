import {EventEmitter, Injectable, Output} from '@angular/core';
import {ClientManagerService} from '../user/client-manager.service';
const PhraseGen = require('korean-random-words');
import * as uuid from "uuid";
import {Channel, DefaultGenerics} from 'stream-chat';
var randomProfile = require('random-profile-generator');

@Injectable({
  providedIn: 'root'
})
export class ChannelManagerService {
  myChannel: any = null;
  otherChannel:  CustomChannel[] = [];
  allChannel: any[] = [];
  members: any[] = [];
  selectChannel: any;
  selectIndex: number = 0;
  @Output()
  changeChannelEvt = new EventEmitter<number>();


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
   * @deprecated
   * @param userId
   */
  public async findChannelById(userId: string) {
    this.myChannel = null;
    this.otherChannel = [];
    this.allChannel = [];
    const filter = { type: 'messaging', members: { $in: [userId] } };
    const sort = { last_message_at: -1 };
    const channels = await this.cliManSvc.getClient().queryChannels(filter, sort, {watch:true});
    // 방장이 나가면 방 없어짐. 즉 나만 있는 방 있으면 방을 만들필요가 없음
    for (const channel of channels) {
      const users = await this.getMembersByChannel(channel);
      if(users.length === 1) {
        this.myChannel = channel;
      } else {
        this.otherChannel.push(channel);
      }
    }
    if (this.myChannel === null) {
      console.log('channel 이 없다...?');
      const channel = await this.createChannelByUserId(userId);
      this.myChannel = channel.channel;
      channels.push(channel.channel);
    }
    this.initChannel();
    return {myChannel: this.myChannel, otherChannel: this.otherChannel};
  }

  /**
   * 내 개인 방이 있는지 확인하는 API
   * 있으면 채널 리턴
   * 없으면 null 리턴
   * @param userId
   */
  public async createChannelByIdAndFrends(userId: string, frendId: string) {
    this.myChannel = null;
    this.otherChannel = [];
    this.allChannel = [];
    // 내가 방장인것에 대한 채널 목록 가져오기
    debugger;
    const masterChannels = await this.findChannelByFrendIdAndUserId(frendId, userId);
    const p = masterChannels.filter((p) => p.selectChannel === true);
    // 내가 방장이면서 친구를 초대한 방이 없다면... 만든다
    if(p.length === 0) {
      const channel = await this.createChannelByMeAndFrend(userId, frendId);
      channel.selectChannel = true;
      masterChannels.push(channel);
    }
    // other 목록 초기화
    masterChannels.forEach((p: any) => this.otherChannel.push(p));
    // other 목록 초기화
    this.initChannel();
    // other 목록 에서 해당 방번호 찾기
    const index = this.otherChannel.findIndex((p) => p.selectChannel === true);
    this.changeChannelEvt.emit(index);

  }

  /**
   * 1. 방장이 나여야하고
   * @param frendId
   * @param userId
   * @private
   */
  private async findChannelByFrendIdAndUserId(frendId: string, userId: string): Promise<CustomChannel[]> {
    debugger;
    const filter = { type: 'messaging', members: {$in: [userId]}};
    const sort = {last_message_at: -1};
    const channels = await this.cliManSvc.getClient().queryChannels(filter, sort, { watch: true });
    for (let i = 0; i < channels.length; i++) {
      // 방장이 나인지 체크
      if(channels[i].data.created_by.id === userId) {
        channels[i].master = true;
      } else {
        channels[i].master = false;
      }
      // 방원중에 클릭한 친구가 있는지 확인
      const members = await channels[i].queryMembers({user_id: frendId});
      for (const member of members.members) {
        if(member.user_id === frendId && channels[i].master === true) {
          channels[i].selectChannel = true;
        } else {
          channels[i].selectChannel = false;
        }
      }
    }
    return channels;
  }
  private initChannel() {
    if(this.myChannel !== null) {
      this.allChannel.push(this.myChannel);
    }
    for (const channel of this.otherChannel) {
      this.allChannel.push(channel)
    }
  }
  public async inviteUserByChannel(user: string[]) {
    await this.selectChannel.inviteMembers(user);
    await this.selectChannel.acceptInvite();
  }
  public async removeChannel(channel: any) {
    return channel.delete();
  }
  public async getChannelMamber(selectChannel: any) {
    const selectChanMem = await selectChannel.queryMembers({});
    return selectChanMem.members;
  }

  private async createChannelByUserId(userId: string): Promise<any> {
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

  private async createChannelByMeAndFrend(userId: string, frendId: string): Promise<any> {
    const roomId = this.genRoomId();
    const roomName = this.genRoomName();

    let nowChannel = await this.cliManSvc.getClient().channel('messaging', roomId, {
      name: roomName,
      image: randomProfile.avatar(),
      members: [userId, frendId],
      session: 30 // custom field, you can add as many as you want
    });
    const create = await nowChannel.create();
    return nowChannel;
  }

  public async getMembersByChannel(nowChannel: any): Promise<any> {
    const members = await nowChannel.queryMembers({});
    return members.members;
  }

  public async initMembersByChannel(nowChannel: any): Promise<any> {
    const watch = await nowChannel.queryMembers({});
    this.members = watch.members;
  }

  public genRoomName(): string {
    return new PhraseGen().getAdjective("-ROOM");
  }
  public genRoomId(): string {
    return uuid.v4();
  }
}

export interface CustomChannel extends Channel<DefaultGenerics>{
  master: boolean;
  selectChannel: boolean;
}
