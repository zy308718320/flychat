import { Document } from 'mongoose';

export interface Friends extends Document {
  uid: string;
  fid: string;
  status: number;
  create_at: number;
  update_at: number;
}
