import { Injectable } from '@nestjs/common';
const StreamChat = require('stream-chat').StreamChat;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World225125!';
  }
  getServerClient() {
    const serverClient = StreamChat.getInstance('dhefjeuw9yg5','k8n2fjatk2ms5bqr69k4rp732hrtqm6kysw8trv5t8vdq7xd4mqcjb99pt7rbe5x');
    return serverClient;
  }
}
