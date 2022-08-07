import { Injectable } from '@nestjs/common';
import {DefaultGenerics, StreamChat} from 'stream-chat';
import { connect } from 'getstream';

@Injectable()
export class TokenService {
  private instance:StreamChat<DefaultGenerics> = undefined;
  private client = undefined;
  getInstance() {
    if(this.instance === undefined) {
      const serverClient = StreamChat.getInstance('kxajvk5xnkg9',
        '4ezvyjb9566bjdxkpv2ejuwqhhggzacwgg5jvjxser94vmjyjtj77n4g8uvu5j3b'
      );
      this.instance = serverClient;
    }
    return this.instance;
  }
  getClient() {
    if(this.client === undefined) {
      this.client = connect('kxajvk5xnkg9', '4ezvyjb9566bjdxkpv2ejuwqhhggzacwgg5jvjxser94vmjyjtj77n4g8uvu5j3b', '1195640');
    }
    return this.client;
  }
}
