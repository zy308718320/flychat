import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  TerminusModuleOptions,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator,
  ) {
  }

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('ping', 'https://baidu.com'),
        async () => this.memory.checkHeap('memory', 150 * 1024 * 1024),
        async () => this.mongoose.pingCheck('mongo'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
