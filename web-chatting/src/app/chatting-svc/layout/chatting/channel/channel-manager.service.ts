import {EventEmitter, Injectable, Output} from '@angular/core';
import {ClientManagerService} from '../user/client-manager.service';
const PhraseGen = require('korean-random-words');
import * as uuid from "uuid";
import {Channel, DefaultGenerics} from 'stream-chat';
import {NgxSpinnerService} from 'ngx-spinner';
var randomProfile = require('random-profile-generator');

@Injectable({
  providedIn: 'root'
})
export class ChannelManagerService {
  myChannel: CustomChannel = null;
  otherChannel:  CustomChannel[] = [];
  allChannel: CustomChannel[] = [];
  members: any[] = [];
  selectChannel: CustomChannel | any;
  selectIndex: number = 0;
  @Output()
  changeChannelEvt = new EventEmitter<number>();


  constructor(private cliManSvc: ClientManagerService,
              private spinner: NgxSpinnerService,) { }

  public initSelectChannel(index: number) {
    this.selectIndex = index;
    this.selectChannel = this.allChannel[index];
    console.log(this.allChannel[index]);
    return this.selectChannel;
  }

  /**
   * 내 개인 방이 있는지 확인하는 API
   * 있으면 채널 리턴
   * 없으면 null 리턴
   * @param userId
   */
  public async createChannelByIdAndFrends(userId: string, frendId: string) {
    await this.spinner.show();
    this.myChannel = null;
    this.otherChannel = [];
    this.allChannel = [];
    // 내가 방장인것에 대한 채널 목록 가져오기
    const masterChannels = await this.findChannelByFrendIdAndUserId(userId, frendId);
    // const p = masterChannels.filter((p) => p.selectChannel === true);
    const p = masterChannels.findIndex((p) => p.selectChannel === true);
    // 내가 방장이면서 친구를 초대한 방이 없다면... 만든다
    if(p === -1) {
      const channel = await this.createChannelByMeAndFrend(userId, frendId);
      channel.selectChannel = true;
      masterChannels.push(channel);
    }
    // other 목록 초기화
    masterChannels.forEach((p: any) => this.otherChannel.push(p));
    // other 목록 초기화
    this.initChannel();
    debugger;
    // other 목록 에서 해당 방번호 찾기
    const index = this.otherChannel.findIndex((p) => p.selectChannel === true);
    this.selectChannel = this.otherChannel[index];
    this.changeChannelEvt.emit(index);
    await this.spinner.hide();
  }

  /**
   * @param frendId
   * @param userId
   * @private
   */
  private async findChannelByFrendIdAndUserId(userId: string, frendId: string): Promise<CustomChannel[]> {
    const filter = { type: 'messaging',
     $and: [ { "members": {$in: [userId]} },
       { "members": {$in: [frendId]} }]
    };
    const sort = {last_message_at: -1};
    const resultChannels = [];
    const channels = await this.cliManSvc.getClient().queryChannels(filter, sort, { watch: true, limit: 30});
    debugger;
    for (let i = 0; i < channels.length; i++) {
      // console.log(channels[i].data.created_by);
      channels[i].selectChannel = false;
      channels[i].master = false;
      const members = await channels[i].queryMembers({});
      const isFrendInMember = members.members.some((p: any) => p.user_id === frendId);
      const isUserIdInMember = members.members.some((p: any) => p.user_id === userId);
      // 내가 방장이면서 친구가 방원
      if(channels[i].data.created_by.id === userId) {
        channels[i].master = true;
        // 방원중에 친구가 들어와 있고 2명이라면 클릭했을때 선택해야할 채널로 지정
        if (isFrendInMember && members.members.length === 2) {
          channels[i].selectChannel = true;
          resultChannels.push(channels[i]);
          continue;
        }
      }
      // 내가 방원이면서 친구가 방장
      if (channels[i].data.created_by.id === frendId) { // 친구가 방장인가?
        if (isUserIdInMember) {
          resultChannels.push(channels[i]);
        }
        continue;
      }
      // 나와 내친구 모두 방원
      if (isFrendInMember && isUserIdInMember) {
        resultChannels.push(channels[i]);
      }
    }
    return resultChannels;
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
    // await this.selectChannel.inviteMembers(user);
    // await this.selectChannel.acceptInvite();
    await this.selectChannel.addMembers(user);
    await this.initChannelMamber(this.selectChannel);
  }

  public async removeChannel(channel: any) {
    return channel.delete();
  }

  public async removeUserBySelChannel(user: string) {
    await this.selectChannel.removeMembers([user]);
  }

  public async getSelectChannelMamber() {
    const selectChanMem = await this.selectChannel.queryMembers({});
    return selectChanMem.members;
  }

  public async initChannelMamber(selectChannel: any) {
    const selectChanMem = await selectChannel.queryMembers({});
    this.members = selectChanMem.members;
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
