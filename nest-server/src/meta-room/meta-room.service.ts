import { Injectable } from '@nestjs/common';
import {Frend, Frends} from '../controller/frend/entities/frend.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
const axios = require('axios').default;
@Injectable()
export class MetaRoomService {
  constructor(@InjectModel('Frend') private  readonly frendModel: Model<Frend>) {
  }
  async findMetaRoomById(userId: string, roomId: string) {
    console.info(`finMetaRoomById : uri : ${`${process.env.PROXY_URI}/userMetaRoom/${userId}/${roomId}`}`);
    const frendsList: Frends = await axios.get(`/frends/${userId}`);
    console.log(frendsList);
    const result = await axios.get(`${process.env.PROXY_URI}/userMetaRoom?id=${roomId}`);
    const user: string[] = result.data[0].users;
    const resultArr = [];
    for (const userElement of user) {
      for (const frendsEle of frendsList.frends) {
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
    console.info(frendsList.frends);
    return resultArr;
  }
}

export interface User {
  userId: string;
  userName?: string;
  isFrend?: boolean;
}
