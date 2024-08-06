import { Injectable } from '@nestjs/common';
import { Borrow, BorrowDocument } from './schemas/borrow.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BorrowStatuses } from './types';

@Injectable()
export class BorrowsRepository {
  constructor(@InjectModel(Borrow.name) private borrowModel: Model<Borrow>) {}

  async create(data: {
    bookId: string;
    userId: string;
  }): Promise<BorrowDocument> {
    const { bookId, userId } = data;

    const createdBorrow = new this.borrowModel({
      bookId,
      userId,
      statusChangeLogs: [
        {
          status: BorrowStatuses.Borrowed,
        },
      ],
    });
    return createdBorrow.save();
  }

  async getManyByUserId(userId: string): Promise<any[]> {
    return this.borrowModel.find({ userId }).lean().exec();
  }

  async getManyByBookId(bookId: string): Promise<BorrowDocument[]> {
    return this.borrowModel.find({ bookId }).exec();
  }

  getNotReturnedByUserIdAndBookId(
    userId: string,
    bookId: string,
  ): Promise<BorrowDocument> {
    return this.borrowModel
      .findOne({ userId, bookId, status: BorrowStatuses.Borrowed })
      .exec();
  }

  async getScoresByBookId(
    bookId: string,
  ): Promise<Pick<BorrowDocument, 'userScore'>[]> {
    return this.borrowModel.find({ bookId }).select('userScore').exec();
  }

  async updateStatus(
    id: string,
    status: BorrowStatuses,
    userScore?: number,
  ): Promise<BorrowDocument> {
    return this.borrowModel.findByIdAndUpdate(
      id,
      {
        status,
        userScore,
        $push: {
          statusChangeLogs: {
            status,
          },
        },
      },
      { new: true },
    );
  }
}
