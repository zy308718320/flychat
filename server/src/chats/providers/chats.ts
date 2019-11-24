import { Connection } from 'mongoose';
import { ChatsSchema } from '../schemas/chats';

export const ChatsProviders = [
  {
    provide: 'CHATS_MODEL',
    useFactory: (connection: Connection) => connection.model('Chats', ChatsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
