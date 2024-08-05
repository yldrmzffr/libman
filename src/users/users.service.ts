import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, UserDocument } from './schemas';
import { CreateUserDto } from './dto';
import { GetUserResponseType } from './types';
import { LogMe } from '../commons/decorators';
import { UserAlreadyExistsException } from './exceptions';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  @LogMe()
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { name } = createUserDto;

    // ! This a potential concurrency issue.
    // ! Should use a unique index in the database or use a lock mechanism.

    const user = await this.usersRepository.findByName(name);

    if (user) {
      throw new UserAlreadyExistsException();
    }

    return this.usersRepository.create(createUserDto);
  }

  @LogMe()
  async getAll(): Promise<GetUserResponseType[]> {
    const users = await this.usersRepository.getAll();

    // ? This logic for remove _id. We can move this to a mapper or formatter layer.
    return users.map(({ id, name }) => ({ id, name }));
  }
}
