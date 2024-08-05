import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDocument } from './schemas';
import { CreateUserDto } from './dto';
import { GetUserResponseType } from './types';
import { LogMe } from '../commons/decorators';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  @LogMe()
  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersRepository.create(createUserDto);
  }

  @LogMe()
  async getAll(): Promise<GetUserResponseType[]> {
    const users = await this.usersRepository.getAll();

    // This logic for remove _id. We can move this to a mapper or formatter layer.
    return users.map(({ id, name }) => ({ id, name }));
  }
}
