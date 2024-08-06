import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto';
import { BookDocument } from './schemas';
import { LogMe } from '../commons/decorators';
import {
  BookAlreadyExistsException,
  BookNotFoundException,
} from './exceptions';
import { BookListResponseDto, BookWithScoreResponseDto } from './types';
import { BorrowsService } from '../borrows/borrows.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly borrowService: BorrowsService,
  ) {}

  @LogMe()
  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const { name } = createBookDto;

    const book = await this.booksRepository.findByName(name);

    if (book) {
      throw new BookAlreadyExistsException();
    }

    return this.booksRepository.create(createBookDto);
  }

  @LogMe()
  async getBookList(): Promise<BookListResponseDto[]> {
    const books = await this.booksRepository.getAll();

    return books.map(({ id, name }) => ({ id, name }));
  }

  @LogMe()
  async getBookById(id: string): Promise<BookDocument> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new BookNotFoundException();
    }

    return book;
  }

  @LogMe()
  async getBooksByIds(ids: string[]): Promise<BookDocument[]> {
    return this.booksRepository.findByIds(ids);
  }

  @LogMe()
  async getBookWithScore(bookId: string): Promise<BookWithScoreResponseDto> {
    const [book, borrows] = await Promise.all([
      this.getBookById(bookId),
      this.borrowService.getScoresByBookId(bookId),
    ]);

    const score =
      borrows.reduce((acc, curr) => acc + curr.userScore, 0) / borrows.length;

    return {
      id: bookId,
      name: book.name,
      score: score === undefined ? -1 : score,
    };
  }
}
