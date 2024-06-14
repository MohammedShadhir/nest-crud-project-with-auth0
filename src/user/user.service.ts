// src/user/user.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with the provided Auth0 ID already exists
    const existingUser = await this.userModel
      .findOne({ auth0Id: createUserDto.auth0Id })
      .exec();

    if (existingUser) {
      throw new ConflictException(
        'User with the provided Auth0 ID already exists.',
      );
    }

    // Create and save the new user
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
