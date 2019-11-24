import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway';

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
