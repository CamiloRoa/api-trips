import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async login(authDto: AuthDto) {
    return await this.usersService.auth(authDto.email, authDto.password);
  }
}
