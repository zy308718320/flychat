import { Document } from 'mongoose';

export interface Messages extends Document {
  _id: any;
  uid: string;
  fid: string;
  status: number;
  content: string;
  create_at: number;
  update_at: number;
}
