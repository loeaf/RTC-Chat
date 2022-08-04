import { Injectable } from '@nestjs/common';
const StreamChat = require('stream-chat').StreamChat;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World225125!';
  }
  getServerClient() {
    const serverClient = StreamChat.getInstance('kxajvk5xnkg9','4ezvyjb9566bjdxkpv2ejuwqhhggzacwgg5jvjxser94vmjyjtj77n4g8uvu5j3b');
    return serverClient;
  }
}
