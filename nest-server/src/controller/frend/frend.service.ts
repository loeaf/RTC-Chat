import {Injectable, NotFoundException} from '@nestjs/common';
import {Frend} from './entities/frend.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class FrendService {

  constructor(@InjectModel('Frend') private  readonly frendModel: Model<Frend>) {
  }
  async create(createFrendDto: Frend) {
    const exists = await this.frendModel.find({userId: createFrendDto.userId, frendId: createFrendDto.frendId});
    console.info(`============= ${JSON.stringify(exists)}`)
    if(exists.length !== 0) {
      console.info(`이미 존재하는 자료 입니다. ${exists}`);
      return null;
    }
    console.info(`없어서 넣습니다 넣어요~ ${exists}`);
    const newFrend = new this.frendModel(createFrendDto);
    const result = await newFrend.save();
    console.info(result);
    return result;
  }

  async findAll() {
    const result = await this.frendModel.find().exec();
    return result;
  }

  async findAcceptFrendListById(id: string) {
    console.info(id);
    let result = undefined;
    try {
      result = await this.frendModel.find({frendId: id, state: 0});
      console.info(result);
    } catch (e) {
      throw new NotFoundException("can't find frends");
    }
    if(result === null) {
      return [];
    } else {
      return result;
    }
  }

  async findMyFrend(userId: string) {
    console.info(userId);
    let result: Frend[] = [];
    try {
      let queryResult = [];
      // 나와 친구를 맺은 모든 애들 서치
      queryResult = await this.frendModel.find({$or : [{userId: userId, state: 1}, {frendId: userId, state: 1}, ]});
      const userIdWithoutMe = [...queryResult].filter(p => p.userId !== userId);
      const frendIdWithoutMe = [...queryResult].filter(p => p.frendId !== userId);
      const frendList = []
      userIdWithoutMe.forEach(p => frendList.push(p.userId));
      frendIdWithoutMe.forEach(p => frendList.push(p.frendId));
      for (const frendId of frendList) {
        result.push({
          userId: userId,
          frendId: frendId
        })
      }
    } catch (e) {
      throw new NotFoundException("can't find frends");
    }
    console.info(result);
    return result;
  }

  async update(id: number, updateFrendDto: Frend) {
    const result = await this.frendModel.findByIdAndUpdate(id, updateFrendDto);
    console.info(result);
    return result;
  }

  async remove(frend: Frend) {
    await this.removeFrend(frend.userId, frend.frendId);
    await this.removeFrend(frend.frendId, frend.userId);
    return 1;
  }

  async removeFrend(userId, frendId) {
    const objects = await this.frendModel.find({userId, frendId});
    for (const object of objects) {
      await this.frendModel.findByIdAndRemove((await object)._id);
    }
  }

  findFrendByMetaRoom(id: string) {
    return '';
  }

  findFrendsByIdAndFrendsId(id: string, createFrendDto: Frend[]) {
    console.info('찾아라 뚝닥!');
    console.info(createFrendDto);
  }
}
