import { Injectable } from '@nestjs/common';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import {TokenService} from '../../token/token.service';
import {ChannelSort} from 'stream-chat';
import * as uuid from "uuid";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Frend} from '../frend/entities/frend.entity';
import {ChatRoom} from './entities/chat-room.entity';
const PhraseGen = require('korean-random-words');
const randomProfile = require('random-profile-generator');

@Injectable()
export class ChatRoomService {
  constructor(private tokenSvc: TokenService,
              @InjectModel('Frend') private  readonly frendModel: Model<Frend>,
              @InjectModel('ChatRoom') private  readonly chatRoomModel: Model<ChatRoom>,
              ) {
  }

  create(createChatRoomDto: CreateChatRoomDto) {
    this.createRoomByIdAndFrends(createChatRoomDto.admin_id, createChatRoomDto.user_id);
    return 'This action adds a new chatRoom';
  }

  async createRoomByIdAndFrends(adminId: string, userId: string) {
    const filter = { type: 'messaging',
      members: {$in: [userId, adminId]},
      // created_by_id: {$eq: userId}
    };
    debugger;
    const sort: ChannelSort = {last_message_at: -1};
    const client = this.tokenSvc.getInstance();
    const channels: any = await client.queryChannels(filter, sort, { watch: true });
    for (let i = 0; i < channels.length; i++) {
      // 방장이 나인지 체크
      channels[i].selectChannel = false;
      channels[i].master = false;
      if(channels[i].data.created_by.id === adminId) {
        channels[i].master = true;
        // 방원중에 클릭한 친구가 있는지 확인
        const members = await channels[i].queryMembers({});
        for (const member of members.members) {
          if(member.user_id === userId && members.members.length === 2) {
            channels[i].selectChannel = true;
            break;
          }
        }
      }
    }

    const p = channels.findIndex((p) => p.selectChannel === true);
    if(p === -1) {
      const channel = await this.createChannelByMeAndFrend(adminId, userId);
      channel.selectChannel = true;
      channels.push(channel);
    }

  }

  private async createChannelByMeAndFrend(userId: string, frendId: string): Promise<any> {
    const roomId = this.genRoomId();
    const roomName = this.genRoomName();

    let nowChannel = await this.tokenSvc.getClient().channel('messaging', roomId, {
      name: roomName,
      image: randomProfile.avatar(),
      members: [userId, frendId],
      session: 30 // custom field, you can add as many as you want
    });
    const create = await nowChannel.create();
    return nowChannel;
  }
  public genRoomName(): string {
    return new PhraseGen().getAdjective("-ROOM");
  }
  public genRoomId(): string {
    return uuid.v4();
  }

  findAll() {
    return `This action returns all chatRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatRoom`;
  }

  update(id: number, updateChatRoomDto: UpdateChatRoomDto) {
    return `This action updates a #${id} chatRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatRoom`;
  }
}
