import { Injectable } from '@angular/core';
import {ChattingHttpService} from '../chatting/chatting-http.service';
import * as uuid from 'uuid';
import {User} from './user-http.service';
import {MessageManagerService} from '../message/message-manager.service';
const StreamChat = require('stream-chat').StreamChat;
const client = StreamChat.getInstance("dz5f4d5kzrue");
const PhraseGen = require('korean-random-words');
const randomProfile = require('random-profile-generator');

@Injectable({
  providedIn: 'root'
})
export class ClientManagerService {
  user: User;

  constructor(private ChatHttpSvc: ChattingHttpService,
              private messageManSvc: MessageManagerService) { }

  /**
   * Client 전역
   */
  getClient(){
    return client;
  }
  async connection(clientId: string, nickName: string, token: string) {
    const _client = await client.connectUser({
      id: clientId,
      name: nickName,
      image: this.genProfImage()

    }, token); // token generated server side
    return _client;
  }

  async findUserByUserId(userId: string) {
    const _client = await client.queryUsers(
      { id: { $in: [userId] } },
      { last_active: -1},
      { presence: true },
    );
    if(_client === undefined) {
      return null
    }
    return _client;
  }

  /**
   * 계정 생성
   * 이때 말하는 계정이란... 연결되어 있으면 계정으로 간주
   * @param userId
   */
  async createClient(user: User) {
    this.user = user;
    const clientToken = await this.ChatHttpSvc.getTokenById(user.id);
    const clientObj = await this.connection(user.id, user.nickName, clientToken.token);
    this.user = clientObj;
    if(clientObj === undefined) {
      console.log('client not found');
      return null;
    } else {
      console.log('connection client');
    }
    return clientObj;
  }

  listenAddMember(selectChannel: any) {
    return selectChannel.on("member.added", (event: any) => {
      console.log(JSON.stringify(event));
      this.messageManSvc.messages.push(`${event.user.name}님 깨서 출근하셨습니다.`);
    });
  }

  listenRemoveMember(selectChannel: any) {
    return selectChannel.on("member.removed", (event: any) => {
      console.log(JSON.stringify(event));
      this.messageManSvc.messages.push(`${event.user.name}님 깨서 퇴근하셨습니다.`);
    });
  }

  listenUpdateMember(selectChannel: any) {
    return selectChannel.on("member.updated", (event: any) => {
      console.log(JSON.stringify(event));
      debugger;
      // this.messages.push(event.message)
    });
  }

  genNickName() {
    return new PhraseGen().generatePhrase();
  }
  public genClientId(): string {
    return uuid.v4();
  }
  public genProfImage(): string {
    return randomProfile.avatar();
  }
}