import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath?: string) {
    const path = `env.${process.env.NODE_ENV || 'development'}` || filePath;
    this.envConfig = dotenv.parse(fs.readFileSync(path));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
