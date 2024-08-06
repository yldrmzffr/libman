import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserDetailResponseDto } from './dto';
import { GetUserResponseType } from './types';
import { ReturnBorrowDto } from './dto/return-borrow.dto';

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

  @Get(':userId')
  @ApiOperation({
    description: 'Get user by id',
    summary: 'Get user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: UserDetailResponseDto,
  })
  async findById(
    @Param('userId') userId: string,
  ): Promise<UserDetailResponseDto> {
    return this.usersService.getUserDetails(userId);
  }

  @Post(':userId/borrow/:bookId')
  @ApiOperation({
    description: 'Borrow a book',
    summary: 'Borrow a book',
  })
  async borrowBook(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ): Promise<void> {
    return this.usersService.borrowBook(userId, bookId);
  }

  @Post(':userId/return/:bookId')
  @ApiOperation({
    description: 'Return a book',
    summary: 'Return a book',
  })
  async returnBook(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
    @Body() { score: userScore }: ReturnBorrowDto,
  ): Promise<void> {
    return this.usersService.returnBook(userId, bookId, userScore);
  }
}
