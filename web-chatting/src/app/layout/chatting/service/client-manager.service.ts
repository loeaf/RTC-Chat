import { Injectable } from '@angular/core';
import {ChattingHttpService} from '../chatting/chatting-http.service';
import * as uuid from 'uuid';
const StreamChat = require('stream-chat').StreamChat;
const client = StreamChat.getInstance("dz5f4d5kzrue");
const PhraseGen = require('korean-random-words');

@Injectable({
  providedIn: 'root'
})
export class ClientManagerService {
  clientObj: any;

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
  async createClient(userId: string) {
    const clientToken = await this.ChatHttpSvc.getTokenById(userId);
    const clientObj = await this.connection(userId, this.genNickName(), clientToken.token);
    this.clientObj = clientObj;
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
}
