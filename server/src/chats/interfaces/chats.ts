import { Document } from 'mongoose';

export interface Chats extends Document {
  _id: any;
  uid: string;
  chatList: [],
  create_at: number;
  update_at: number;
}
