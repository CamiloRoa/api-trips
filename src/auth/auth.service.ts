import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  login(authDto: AuthDto) {
    return this.usersService.auth(authDto.email, authDto.password);
  }
}
