import { Model } from 'mongoose';
import * as crypto from 'crypto-js';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from './interfaces';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModel: Model<Users>,
  ) {
  }

  async create(createUserDto): Promise<Users> {
    createUserDto.password = crypto.MD5(createUserDto.password).toString();
    const user = await this.usersModel.findOne({ username: createUserDto.username });
    if (!user || Object.keys(user).length <= 0) {
      createUserDto.create_at = +new Date();
      const createdCat = new this.usersModel(createUserDto);
      return await createdCat.save();
    } else {
      throw new HttpException('用户名已存在', HttpStatus.FORBIDDEN);
    }
  }

  async login(username: string): Promise<Users | undefined> {
    return await this.usersModel.findOne({ username }).exec();
  }

  async updateStatus(username: string, status: number, clientId: string | null): Promise<object> {
    return await this.usersModel.update({ username }, { status, clientId });
  }
}
