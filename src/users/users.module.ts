import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';

import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategy/jwt.strategy'
@Module({
  imports: [JwtModule.register({
    secret: 'security',
    signOptions: {
      expiresIn: '1d'
    }
  })],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
