import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const { apiKey, databaseName } = this.configService.get('config.env');
    return `Hello World! ${apiKey} ${databaseName}`;
  }
}
