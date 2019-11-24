import { Connection } from 'mongoose';
import { FriendsSchema } from '../schemas';

export const FriendsProviders = [
  {
    provide: 'FRIENDS_MODEL',
    useFactory: (connection: Connection) => connection.model('Friends', FriendsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
