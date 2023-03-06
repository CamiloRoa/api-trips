import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from './interfaces/user.interface';

import { UserRepository } from '../repository/user.repository';

//import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository, //private jwtService: JwtService,
  ) {}

  create(createUser: User) {
    return this.userRepository.create(createUser);
  }

  async findByUser(id) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async getDrivers() {
    const drivers = await this.userRepository.findDrivers();
    if (!drivers)
      throw new NotFoundException(
        'sorry we dont have drivers available at the moment',
      );
    return drivers;
  }

  async auth(email: string, password: string) {
    const user = await this.userRepository.auth(email, password);
    if (!user) throw new UnauthorizedException('User invalid');
  }

  // async generateJWT(user: User) {
  //   const payload = { sub: user._id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user,
  //   };
  // }
}
