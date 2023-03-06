import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { config, validationSchema } from './config';

import { DatabaseModule } from './database/database.module';
import { environments } from './enviroments';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    HttpModule,
    DatabaseModule,
    RepositoryModule,
    TripsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'TASKS',
    //   useFactory: async (http: HttpService) => {
    //     const task = await firstValueFrom(
    //       http.get('https://jsonplaceholder.typicode.com/todos'),
    //     );
    //     return task.data;
    //   },
    //   inject: [HttpService],
    // },
  ],
})
export class AppModule {}
