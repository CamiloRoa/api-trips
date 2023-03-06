import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { IDatabase } from './database.interface';

const API_KEY = '123456';
const API_KEY_PROD = 'JSJ39J389';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      // 👈 Implement Module
      useFactory: (configService: ConfigService) => {
        const { connection, user, password, host, port, dbName } =
          configService.get<IDatabase>('config.mongo');
        return {
          uri: `${connection}://${host}:${port}`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
