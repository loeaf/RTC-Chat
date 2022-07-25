import {Injectable, NotFoundException} from '@nestjs/common';
import {Frend} from './entities/frend.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class FrendService {

  constructor(@InjectModel('Frend') private  readonly frendModel: Model<Frend>) {
  }
  async create(createFrendDto: Frend) {
    const newFrend = new this.frendModel(createFrendDto);
    const result = await newFrend.save();
    console.log(result);
    return result;
  }

  async findAll() {
    const result = await this.frendModel.find().exec();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} frend`;
  }

  async findAllById(id: string) {
    console.log(id);
    let result = undefined;
    try {
      result = await this.frendModel.findById(id);
      console.log(result);
    } catch (e) {
      throw new NotFoundException("can't find frends");
    }
    if(result === null) {
      return [];
    } else {
      return result;
    }
  }

  async update(id: number, updateFrendDto: Frend) {
    const result = await this.frendModel.findByIdAndUpdate(id, updateFrendDto);
    return result;
  }

  remove(id: number) {
    const result = this.frendModel.findByIdAndRemove(id);
    return result;
  }

  findFrendByMetaRoom(id: string) {
    return '';
  }

  findFrendsByIdAndFrendsId(id: string, createFrendDto: Frend[]) {
    console.log('찾아라 뚝닥!');
    console.log(createFrendDto);
  }
}
