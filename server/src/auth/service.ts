import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/service';
import * as crypto from 'crypto-js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(uname: string, pwd: string): Promise<any> {
    const user = await this.usersService.login(uname);
    pwd = crypto.MD5(pwd).toString();
    if (user && user.password === pwd) {
      let result;
      const { _id, username, nickname, portrait, explain } = user;
      result = { _id, username, nickname, portrait, explain };
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      uid: user._id,
      username: user.username,
      nickname: user.nickname,
      portrait: user.portrait,
      explain: user.explain,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
