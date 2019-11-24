import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { EventsGateway } from '../events/gateway';
import { Chats } from './interfaces/chats';
import { Messages } from './interfaces/messages';
import { Users } from '../users/interfaces';

@Injectable()
export class ChatsService {
  constructor(
    @Inject('CHATS_MODEL')
    private readonly chatsModel: Model<Chats>,
    @Inject('MESSAGES_MODEL')
    private readonly messagesModel: Model<Messages>,
    @Inject('USERS_MODEL')
    private readonly usersModel: Model<Users>,
    private readonly eventsGateway: EventsGateway,
  ) {
  }

  async getChatList(uid: string) {
    const chats = await this.chatsModel.find({ uid });
    const chatList = [];
    chats.forEach(item => {
      const { _id, fid, portrait, nickname, content, create_at } = item;
      chatList.push({ id: _id, fid, portrait, nickname, content, create_at });
    });
    return chatList;
  }

  async getMessageList(id: string, fid: string) {
    const messages = await this.messagesModel.find({
      $or: [
        { $and: [{ uid: id }, { fid }] },
        { $and: [{ uid: fid }, { fid: id }] },
      ],
    });
    const messageList = [];
    const messageQ = [];
    messages.forEach(async (item) => {
      const { uid, content, create_at } = item;
      messageQ.push(this.usersModel.findById(uid));
      messageList.push({ uid, content, create_at });
    });
    return Promise.all(messageQ).then((userList) => {
      userList.forEach((item, i) => {
        const { nickname, portrait } = item;
        messageList[i].nickname = nickname;
        messageList[i].avatar = portrait;
      });
      return messageList;
    });
  }

  async addChat(uid: string, addChatDto) {
    const chat = await this.chatsModel.findOne({ $and: [{ fid: addChatDto.fid }, { uid }] });
    if (!chat || Object.keys(chat).length <= 0) {
      addChatDto.uid = uid;
      const createdCat = new this.chatsModel(addChatDto);
      return await createdCat.save();
    } else {
      return await this.chatsModel.update({uid},
        {content: addChatDto.content, update_at: addChatDto.update_at}
      );
    }
  }

  async addMessage(user, addMessageDto) {
    const nowDate = +new Date();
    addMessageDto.uid = user.uid;
    const friend = await this.usersModel.findById(addMessageDto.fid);
    if (friend.status === 1 && friend.clientId !== '') {
      // 在线状态
      const chat = {
        uid: user.uid,
        nickname: user.nickname,
        avatar: user.portrait,
        content: addMessageDto.content,
        create_at: nowDate,
        update_at: nowDate,
      };
      this.eventsGateway.sendMessage(friend.clientId, chat);
      addMessageDto.status = 1;
    } else {
      addMessageDto.status = 0;
    }
    await this.addChat(user.uid, {
      fid: addMessageDto.fid,
      portrait: friend.portrait,
      nickname: friend.nickname,
      content: addMessageDto.content,
      create_at: nowDate,
      update_at: nowDate
    });
    const addMessage = new this.messagesModel(addMessageDto);
    return await addMessage.save();
  }
}
