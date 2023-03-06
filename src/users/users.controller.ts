import { Controller, Param, Post, Body, Get } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dto';

import { MongoIdPipe } from '../common/mongo-id.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
  @Get(':id')
  findByUser(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findByUser(id);
  }
}
