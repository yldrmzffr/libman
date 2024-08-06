import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBookDto } from './dto';
import { BookListResponseDto, BookWithScoreResponseDto } from './types';
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
  async findAll(): Promise<BookListResponseDto[]> {
    return this.booksService.getBookList();
  }

  @Get(':bookId')
  @ApiOperation({
    description: 'Get book by id',
    summary: 'Get book by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Book with score',
    type: BookWithScoreResponseDto,
  })
  async findById(
    @Param('bookId') bookId: string,
  ): Promise<BookWithScoreResponseDto> {
    return this.booksService.getBookWithScore(bookId);
  }
}
