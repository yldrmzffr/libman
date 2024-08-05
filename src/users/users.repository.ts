import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas';
import { InjectModel } from '@nestjs/mongoose';

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

  async create(data: User): Promise<UserDocument> {
    const createdCat = new this.userModel(data);
    return createdCat.save();
  }

  async getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
