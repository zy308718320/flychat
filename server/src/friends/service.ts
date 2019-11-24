import { Model } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Friends } from './interfaces';
import { Users } from '../users/interfaces';

@Injectable()
export class FriendsService {
  constructor(
    @Inject('FRIENDS_MODEL')
    private readonly friendsModel: Model<Friends>,
    @Inject('USERS_MODEL')
    private readonly usersModel: Model<Users>,
  ) {}

  async addFriend(uid, addFriendDto) {
    const user = await this.friendsModel.findOne({$and: [{ fid: addFriendDto.fid }, {uid}]});
    if (!(!user || Object.keys(user).length <= 0)) {
      throw new HttpException('好友已存在', HttpStatus.FORBIDDEN);
    } else {
      addFriendDto.create_at = +new Date();
      const addFriendDto2: Friends = Object.assign({}, addFriendDto);
      addFriendDto.uid = uid;
      addFriendDto2.uid = addFriendDto.fid;
      addFriendDto2.fid = uid;
      const addFriend = new this.friendsModel(addFriendDto);
      const addFriend2 = new this.friendsModel(addFriendDto2);
      await addFriend.save();
      return await addFriend2.save();
    }
  }

  async getFriendList(uid: string) {
    const friends = await this.friendsModel.find({uid});
    const friendsId = friends.map((item) => item.fid);
    const friendsInfo = [];
    friendsId.forEach((item) => {
      friendsInfo.push(this.usersModel.findById(item));
    });
    return Promise.all(friendsInfo);
  }
}
