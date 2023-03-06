import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dtos/user.dto';
import { User } from './models/user.schema';
import { Roles } from './models/roles.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUser);
    return await newUser.save();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).populate('rol').exec();
  }

  async findDrivers(): Promise<User[]> {
    const users = await this.userModel
      .find({ status: 'FREE' })
      .populate('rol')
      .exec();
    const driverUsers = users.filter((user) => {
      const role = user.rol as Roles;
      return role.name === 'driver';
    });
    return driverUsers;
  }

  async auth(email: string, password) {
    return this.userModel.findOne({ email: email, password: password });
  }
}
