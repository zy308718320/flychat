import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  nickname: String,
  portrait: String,
  username: String,
  password: String,
  gender: Number,
  explain: String,
  email: String,
  clientId: String,
  status: Number, // 在线或离线
  create_at: Number,
  update_at: Number,
});
