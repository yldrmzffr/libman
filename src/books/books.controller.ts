import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBookDto } from './dto';
import { BookListResponseDto } from './types';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({
    description: 'Create a new book',
    summary: 'Create a new book',
  })
  async create(@Body() createBookDto: CreateBookDto): Promise<void> {
    await this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({
    description: 'Get books list',
    summary: 'Get books list',
  })
  @ApiResponse({
    status: 200,
    description: 'All books',
    type: [BookListResponseDto],
  })
  async findAll() {
    return this.booksService.getBookList();
  }
}
