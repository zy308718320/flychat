import { Document } from 'mongoose';

export interface Friends extends Document {
  _id: any;
  uid: string;
  fid: string;
  status: number;
  create_at: number;
  update_at: number;
}
