import { Module } from '@nestjs/common';
import { FriendsController } from './controller';
import { FriendsService } from './service';
import { FriendsProviders } from './providers';
import { DatabaseModule } from '../database/module';
import { UsersProviders } from '../users/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
  providers: [FriendsService,
    ...FriendsProviders,
    ...UsersProviders],
})

export class FriendsModule {
}
