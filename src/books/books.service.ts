import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto';
import { BookDocument } from './schemas';
import { LogMe } from '../commons/decorators';
import { BookAlreadyExistsException } from './exceptions';
import { BookListResponseDto } from './types';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  @LogMe()
  create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const { name } = createBookDto;

    const book = this.booksRepository.findByName(name);

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
}
