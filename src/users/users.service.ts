import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDocument } from './schemas';
import { CreateUserDto } from './dto';
import { GetUserResponseType } from './types';
import { LogMe } from '../commons/decorators';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions';
import { BorrowsService } from '../borrows/borrows.service';
import { BooksService } from '../books/books.service';
import { BorrowStatuses } from '../borrows/types';
import { UserDetailResponseDto } from './dto/response/user-detail-response.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly booksService: BooksService,
    private readonly borrowsService: BorrowsService,
  ) {}

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

  @LogMe()
  async getById(id: string): Promise<UserDocument> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  @LogMe()
  async getUserDetails(userId: string): Promise<UserDetailResponseDto> {
    const [user, borrows] = await Promise.all([
      this.getById(userId),
      this.borrowsService.getBorrowsByUserId(userId),
    ]);

    // ! We can move this logic to logic layer.

    const bookIds = new Set(borrows.map((borrow) => borrow.bookId));
    const books = await this.booksService.getBooksByIds([...bookIds]);

    const bookMap = new Map(books.map((book) => [book.id, book]));

    const [pastBorrows, presentBorrows] = borrows.reduce(
      (acc, borrow) => {
        const book = bookMap.get(borrow.bookId);
        if (!book) return acc;

        const borrowInfo = { id: book.id, userScore: borrow.userScore };
        const index = borrow.status === BorrowStatuses.Returned ? 0 : 1;
        acc[index].push(borrowInfo);
        return acc;
      },
      [[], []],
    );

    return {
      id: userId,
      name: user.name,
      books: {
        past: pastBorrows,
        present: presentBorrows,
      },
    };
  }

  @LogMe()
  async borrowBook(userId: string, bookId: string): Promise<void> {
    await Promise.all([
      this.getById(userId),
      this.booksService.getBookById(bookId),
    ]);

    await this.borrowsService.borrowBook(userId, bookId);
  }

  @LogMe()
  async returnBook(
    userId: string,
    bookId: string,
    userScore: number,
  ): Promise<void> {
    await Promise.all([
      this.getById(userId),
      this.booksService.getBookById(bookId),
    ]);

    await this.borrowsService.returnBook(userId, bookId, userScore);
  }
}
