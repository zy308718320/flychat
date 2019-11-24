import { Module } from '@nestjs/common';
import { UsersModule } from './users/module';
import { FriendsModule } from './friends/module';
import { ChatsModule } from './chats/module';
import { EventsModule } from './events/module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './terminus-options.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/module';
import { ConfigModule } from './config/module';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/flychat'),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    EventsModule, AuthModule, ConfigModule,
    UsersModule, FriendsModule, ChatsModule],
})
export class AppModule {
}
