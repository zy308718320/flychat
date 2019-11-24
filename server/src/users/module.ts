import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { UsersService } from './service';
import { UsersProviders } from './providers';
import { DatabaseModule } from '../database/module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService,
    ...UsersProviders],
  exports: [UsersService],
})

export class UsersModule {
}
