import * as mongoose from 'mongoose';

export const FrendSchema = new mongoose.Schema({
  _id: {type: String, required: true}, // 지금은 번호로 주고 나중에 주석처리로 제거
  userId: {type: String, required: true},
  frendId: {type: String, required: true},
  state: {type: Number, required: true}
});

export interface Frend {
  id: string;
  userId: string;
  frendId: string;
  state: FrendRequestState;
}

export interface Frends {
  frends: Frend[];
}

export enum FrendRequestState {
  요청,
  승인,
  취소
}
export enum FrendState {
  일반,
  친구
}
