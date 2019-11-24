import { Controller, Post, Body, UseGuards, Get, Query, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ChatsService } from './service';
import { MessageListDto } from './dto/message-list';
import { AddMessageDto } from './dto/add-message';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('node/chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
  ) {}

  @Get('chatList')
  chatList(@Request() req) {
    return this.chatsService.getChatList(req.user.uid);
  }

  @Get('messageList')
  messageList(@Request() req, @Query() messageListDto: MessageListDto) {
    return this.chatsService.getMessageList(req.user.uid, messageListDto.fid);
  }

  @Post('sendMessage')
  sendMessage(@Request() req, @Body() addMessageDto: AddMessageDto) {
    // 需要过滤掉一些无用和敏感字段
    return this.chatsService.addMessage(req.user, addMessageDto);
  }
}
