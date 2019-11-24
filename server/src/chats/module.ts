import { Module } from '@nestjs/common';
import { ChatsController } from './controller';
import { ChatsService } from './service';
import { ChatsProviders } from './providers/chats';
import { MessagesProviders } from './providers/messages';
import { DatabaseModule } from '../database/module';
import { EventsGateway } from '../events/gateway';
import { UsersProviders } from '../users/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatsController],
  providers: [ChatsService,
    EventsGateway,
    ...ChatsProviders,
    ...MessagesProviders,
    ...UsersProviders],
})

export class ChatsModule {
}
