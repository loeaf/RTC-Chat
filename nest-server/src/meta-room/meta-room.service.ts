import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RuntimeException} from '@nestjs/core/errors/exceptions/runtime.exception';
import {FrendService} from '../controller/frend/frend.service';
import {Frend} from '../controller/frend/entities/frend.entity';
const axios = require('axios').default;
@Injectable()
export class MetaRoomService {
  constructor(@InjectModel('Frend') private  readonly frendModel: Model<Frend>,
              private frendService: FrendService) {
  }
  async findMetaRoomById(userId: string, roomId: string) {
    console.info(`finMetaRoomById : uri : ${`${process.env.PROXY_URI}/userMetaRoom/${userId}/${roomId}`}`);
    const p = `http://localhost:3001/frends/${userId}`;
    console.info(p);
    // 나에 대해서 누가 친구인지 찾는다
    let frendsList: Frend[] = await this.frendService.findMyFrend(userId);

    console.log(frendsList);
    // 해당 방에 대한 사람 목록을 가져온다
    const result = await axios.get(`${process.env.PROXY_URI}/userMetaRoom?id=${roomId}`);
    if(result.data.length === 0) {
      return [];
    }
    const user: string[] = result.data[0].users;
    const resultArr = [];
    // 방에 대한 목록 순회
    for (const userElement of user) {
      // 내친구 목록 순회
      let isFrend = false;
      for (const frendsEle of frendsList) {
        // 방에 대한 친구가 내 친구와 같으면
        if(userElement === frendsEle.frendId) {
          isFrend = true;
        } else {
          isFrend = false;
        }
      }
      const user: MetaRoomFrend = {
        userId: userElement,
        isFrend: isFrend
      }
      resultArr.push(user)
    }
    console.info(result.data[0].users);
    return resultArr;
  }
}

export interface MetaRoomFrend {
  userId: string;
  userName?: string;
  isFrend?: boolean;
}

