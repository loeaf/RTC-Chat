import * as mongoose from 'mongoose';
import {SchemaFactory} from '@nestjs/mongoose';

export const FrendSchema = new mongoose.Schema({
  _id: {type: String, required: true}, // 지금은 번호로 주고 나중에 주석처리로 제거
  userId: {type: String, required: true},
  frendId: {type: String, required: true},
  state: {type: Number, required: true}
});
FrendSchema.index({ userId: 1,  frendId: 1}, { unique: true })
export interface Frend {
  _id?: string;
  userId: string;
  frendId: string;
  state?: FrendRequestState;
}

export interface Frends {
  frends: Frend[];
}

export enum FrendRequestState {
  요청,
  승인,
  거절
}
export enum FrendState {
  일반,
  친구
}
