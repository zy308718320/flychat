import {
  Controller, Post, Body, UseGuards, Get, Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FriendsService } from './service';
import { AddFriendDto } from './dto/add-friend';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('node/friends')
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
  ) {
  }

  @Post('addFriend')
  addFriend(@Request() req, @Body() addFriendDto: AddFriendDto) {
    return this.friendsService.addFriend(req.user.uid, addFriendDto);
  }

  @Get('friendList')
  async friendList(@Request() req) {
    const friendsInfo = await this.friendsService.getFriendList(req.user.uid);
    const friendsList = [];
    friendsInfo.forEach((item) => {
      const {_id, nickname, portrait, explain, gender} = item;
      friendsList.push({uid: _id, nickname, portrait, explain, gender});
    });
    return friendsList;
  }
}
