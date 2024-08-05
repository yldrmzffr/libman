import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto';
import { GetUserResponseType } from './types';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    description: 'Create a new user',
    summary: 'Create a new user',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    description: 'Get all users',
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'All users',
    type: [GetUserResponseType],
  })
  async findAll(): Promise<GetUserResponseType[]> {
    return this.usersService.getAll();
  }
}
