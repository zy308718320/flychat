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
    return await this.chatsModel.findOne({ uid });
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
    for (const item of messages) {
      const { uid, content, create_at, update_at } = item;
      messageQ.push(this.usersModel.findById(uid));
      messageList.push({ uid, content, create_at, update_at });
    }
    return Promise.all(messageQ).then((userList) => {
      userList.forEach((item, i) => {
        const { nickname, portrait } = item;
        messageList[i].nickname = nickname;
        messageList[i].avatar = portrait;
      });
      return messageList;
    });
  }

  async addChats(uid: string, addChatsDto) {
    const nowDate = +new Date();
    addChatsDto.update_at = nowDate;
    const chats = await this.chatsModel.findOne({ uid });
    if (!chats || Object.keys(chats).length <= 0) {
      addChatsDto.uid = uid;
      addChatsDto.create_at = nowDate;
      const createdCat = new this.chatsModel(addChatsDto);
      return createdCat.save();
    } else {
      return await this.chatsModel.update({uid},
        {chatList: addChatsDto.chatList}
      );
    }
  }

  async addMessage(user, addMessageDto) {
    const nowDate = +new Date();
    addMessageDto.uid = user.uid;
    addMessageDto.create_at = nowDate;
    addMessageDto.update_at = nowDate;
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
    const addMessage = new this.messagesModel(addMessageDto);
    return addMessage.save();
  }
}
