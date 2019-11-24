import * as mongoose from 'mongoose';

export const MessagesSchema = new mongoose.Schema({
  uid: String,
  fid: String,
  status: Number,
  content: String,
  create_at: Number,
  update_at: Number,
});
