import { Connection } from 'mongoose';
import { MessagesSchema } from '../schemas/messages';

export const MessagesProviders = [
  {
    provide: 'MESSAGES_MODEL',
    useFactory: (connection: Connection) => connection.model('Messages', MessagesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
