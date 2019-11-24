import * as mongoose from 'mongoose';

export const FriendsSchema = new mongoose.Schema({
  uid: String,
  fid: String,
  status: Number,
  create_at: Number,
  update_at: Number,
});
