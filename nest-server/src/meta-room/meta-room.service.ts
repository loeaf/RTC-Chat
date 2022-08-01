import { Injectable } from '@nestjs/common';
import {Frend, Frends} from '../controller/frend/entities/frend.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RuntimeException} from '@nestjs/core/errors/exceptions/runtime.exception';
import {FrendService} from '../controller/frend/frend.service';
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
    let frendsList: Frend[] = await this.frendService.findMyFrend(userId);
    // let frendsList = await axios.get(`http://localhost:3001/frends/${userId}`);

    console.log(frendsList);
    const result = await axios.get(`${process.env.PROXY_URI}/userMetaRoom?id=${roomId}`);
    if(result.data.length === 0) {
      return [];
    }
    const user: string[] = result.data[0].users;
    const resultArr = [];
    for (const userElement of user) {
      for (const frendsEle of frendsList) {
        if(userElement === frendsEle.frendId) {
          const user: User = {
            userId: frendsEle.frendId,
            isFrend: true
          }
          resultArr.push(user)
        } else {
          const user: User = {
            userId: frendsEle.frendId,
            isFrend: false
          }
          resultArr.push(user)
        }
      }
    }
    console.info(result.data[0].users);
    return resultArr;
  }
}

export interface User {
  userId: string;
  userName?: string;
  isFrend?: boolean;
}
