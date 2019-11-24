import * as mongoose from 'mongoose';

export const providers = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/flychat'),
  },
];
