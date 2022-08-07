import mongoose from 'mongoose';

export const ChatRoomSchema = new mongoose.Schema({
  _id: {type: String, required: true}, // 지금은 번호로 주고 나중에 주석처리로 제거
  sc_room_id: {type: String, required: true},
  admin_id: {type: String, required: true},
  user_id: {type: [String], required: true}
});

export class ChatRoom {
  _id: string;
  sc_room_id: string;
  admin_id: string;
  user_id: string[];
}
