import {Document} from 'mongoose';

export interface Users extends Document {
  _id: any;
  nickname: string;
  portrait: string;
  username: string;
  password: string;
  gender: number;
  explain: string;
  email: string;
  clientId: string;
  status: number;
  create_at: number;
  update_at: number;
}
