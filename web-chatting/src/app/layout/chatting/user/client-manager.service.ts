import { Injectable } from '@angular/core';
import {ChattingHttpService, User} from '../chatting/chatting-http.service';
import * as uuid from 'uuid';
const StreamChat = require('stream-chat').StreamChat;
const client = StreamChat.getInstance("dz5f4d5kzrue");
const PhraseGen = require('korean-random-words');
const randomProfile = require('random-profile-generator');

@Injectable({
  providedIn: 'root'
})
export class ClientManagerService {
  user: User;

  constructor(private ChatHttpSvc: ChattingHttpService) { }

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
