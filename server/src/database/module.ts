import { Module } from '@nestjs/common';
import { providers } from './providers';

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
