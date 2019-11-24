import { Document } from 'mongoose';

export interface Chats extends Document {
  uid: string;
  fid: string;
  portrait: string;
  nickname: string;
  content: string;
  create_at: number;
  update_at: number;
}
