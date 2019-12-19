import * as mongoose from 'mongoose';

export const ChatsSchema = new mongoose.Schema({
  uid: String,
  chatList: Array,
  // fid: String,
  // portrait: String,
  // nickname: String,
  // content: String,
  create_at: Number,
  update_at: Number,
});
