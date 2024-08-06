import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByName(name: string): Promise<UserDocument> {
    return this.userModel
      .findOne({
        name,
      })
      .exec();
  }

  async create(data: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
