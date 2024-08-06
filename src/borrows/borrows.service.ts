import { Injectable } from '@nestjs/common';
import { BorrowsRepository } from './borrows.repository';
import { LogMe } from '../commons/decorators';
import { BorrowStatuses } from './types';
import {
  BookIsNotAvailableException,
  BorrowNotFoundException,
} from './exceptions';
import { BorrowDocument } from './schemas/borrow.schema';

@Injectable()
export class BorrowsService {
  constructor(private readonly borrowsRepository: BorrowsRepository) {}

  @LogMe()
  async checkAvailability(bookId: string): Promise<boolean> {
    const borrows = await this.borrowsRepository.getManyByBookId(bookId);
    return borrows.every((borrow) => borrow.status === BorrowStatuses.Returned);
  }

  @LogMe()
  async borrowBook(userId: string, bookId: string): Promise<any> {
    const isAvailable = await this.checkAvailability(bookId);

    if (!isAvailable) {
      throw new BookIsNotAvailableException();
    }

    return this.borrowsRepository.create({ userId, bookId });
  }

  @LogMe()
  async returnBook(
    userId: string,
    bookId: string,
    userScore: number,
  ): Promise<BorrowDocument> {
    const borrow = await this.borrowsRepository.getNotReturnedByUserIdAndBookId(
      userId,
      bookId,
    );

    if (!borrow) {
      throw new BorrowNotFoundException();
    }

    return this.borrowsRepository.updateStatus(
      borrow.id,
      BorrowStatuses.Returned,
      userScore,
    );
  }

  @LogMe()
  async getScoresByBookId(
    bookId: string,
  ): Promise<Pick<BorrowDocument, 'userScore'>[]> {
    const borrows = await this.borrowsRepository.getScoresByBookId(bookId);

    return borrows.filter((borrow) => borrow.userScore !== undefined);
  }

  @LogMe()
  async getBorrowsByUserId(userId: string): Promise<BorrowDocument[]> {
    return this.borrowsRepository.getManyByUserId(userId);
  }
}
