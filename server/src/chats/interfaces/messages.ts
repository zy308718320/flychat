import { Document } from 'mongoose';

export interface Messages extends Document {
  uid: string;
  fid: string;
  status: number;
  content: string;
  create_at: number;
  update_at: number;
}
